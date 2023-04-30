import React, { useState, useEffect } from "react";

import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect, useCanister } from "@connect2ic/react";
import { createClient } from "@connect2ic/core";
import { AstroX } from "@connect2ic/core/providers/astrox";
import { InfinityWallet } from "@connect2ic/core/providers";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
import { StoicWallet  } from "@connect2ic/core/providers";
import { NFID } from "@connect2ic/core/providers/nfid";
import { Principal } from "@dfinity/principal";
import { getCrc32 } from "@dfinity/principal/lib/cjs/utils/getCrc.js";
import { sha224 } from "@dfinity/principal/lib/cjs/utils/sha224.js";
import { Buffer } from 'buffer';

import * as main from "canisters/main";
// import { HttpAgent } from "@dfinity/agent";
// import { createActor } from "../../src/declarations/main/index.js"; // Need to commentout "export const main = createActor(canisterId);" in this file.

import { Form } from "./components/Form";

import "@connect2ic/core/style.css";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [accountNbr_0, setaccountNbr_0] = useState("");
  const [accountNbr_1, setaccountNbr_1] = useState("");
  const [accountNbr_2, setaccountNbr_2] = useState("");
  const [accountNbr_3, setaccountNbr_3] = useState("");
  const [accountNbr_4, setaccountNbr_4] = useState("");
  const [principalID, setPrincipalID] = useState("");
  const [iiPrincipalID, setIIPrincipalID] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  // const authClient = AuthClient.create();

  const [mainCanister, { loading, error }] = useCanister("main",  { mode: "connected" });
  // console.log(loading, error)

  const { principal, isConnecting, connect, activeProvider } = useConnect({
    onConnect: () => {
        setIsLoggedIn(true);
    },
    onDisconnect: () => {
        setIsLoggedIn(false);
    }
  });

  useEffect(() => {
    if (principal) {
      setaccountNbr_0(accountOfPrincipal(Principal.fromText(principal), 0).replace(/"/g, ''));
      setaccountNbr_1(accountOfPrincipal(Principal.fromText(principal), 1).replace(/"/g, ''));
      setaccountNbr_2(accountOfPrincipal(Principal.fromText(principal), 2).replace(/"/g, ''));
      setaccountNbr_3(accountOfPrincipal(Principal.fromText(principal), 3).replace(/"/g, ''));
      setaccountNbr_4(accountOfPrincipal(Principal.fromText(principal), 4).replace(/"/g, ''));
      setPrincipalID(principal.replace(/"/g, ''));
    }
  }, [principal]);

  const addCrc32 = (buf) => {
    const crc32Buf = Buffer.alloc(4);
    crc32Buf.writeUInt32BE(getCrc32(buf), 0);
    return Buffer.concat([crc32Buf, buf]);
  };

  const accountIdentifierFromSubaccount = (principal, subaccount) => {
    const preimage = Buffer.concat([
      Buffer.from("\x0Aaccount-id"),
      principal,
      subaccount,
    ]);
    const hashed = Buffer.from(sha224(preimage));
    return addCrc32(hashed).toString("hex");
  };

  const accountOfPrincipal = (principal, subaccount) => {
    let accountNumber = accountIdentifierFromSubaccount(
      Buffer.from(principal.toUint8Array()),
      Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,subaccount])
    );
    return accountNumber;
  };

  function handleAccountChange(event) {
    setSelectedAccount(accountOfPrincipal(Principal.fromText(principal), event.target.value).replace(/"/g, ''));
    setSelectedOption(parseInt(event.target.value));
  };

  const claimTokens = async (event) => {
    event.preventDefault();
    const iiPrincipalIDRegex = /^(?:[a-z0-9]{5}-){10}[a-z0-9]{3}$/;
    const confirmCheckbox = document.getElementById("confirm");

    if (!selectedAccount || selectedAccount === "Select the account you want to use") {
      alert("Please select an account.");
      return;
    }

    if (!confirmCheckbox.checked) {
      alert("Please confirm that the wallet information is correct.");
      return;
    }

    if (!iiPrincipalID || iiPrincipalID.length === 0) {
      alert("You cannot leave this field blank.");
      return;
    } else if (!iiPrincipalIDRegex.test(iiPrincipalID)) {
      alert("Please enter a valid principal in the correct format.");
      return;
    } else {
      let sub = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,selectedOption]]
      try {
        let register = await mainCanister.register(sub, iiPrincipalID);
        alert("Your NFT has been claimed. The II principal ID that you gave will be added to the SNS launch config.");
        console.log(register)
      } catch (e) {
        alert("You have logged in with the wrong wallet or put in the wrong Subaccount.");
        console.log(e)
      }

    }
  };

  return (
    <div className="App">
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen" id="kani"></div>
          <div className="auth-section">
            <ConnectButton/>
          </div>
          <ConnectDialog />
          <Form
            iiPrincipalID={iiPrincipalID}
            setIIPrincipalID={setIIPrincipalID}
            claimTokens={claimTokens}
            isLoggedIn={isLoggedIn}
            accountNbr_0={accountNbr_0}
            accountNbr_1={accountNbr_1}
            accountNbr_2={accountNbr_2}
            accountNbr_3={accountNbr_3}
            accountNbr_4={accountNbr_4}
            principalID={principalID}
            handleAccountChange={handleAccountChange}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
    </div>
  )
}

let host = 'https://ic0.app'
if (location.port === '3000' || location.port === '8000') {
  host = 'http://127.0.0.1:8080'
}

const client = createClient({
  canisters: {
    main
  },
  providers: [
    new StoicWallet(),
    new PlugWallet(),
    new NFID(),
    new AstroX(),
    new InfinityWallet(),
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    // Determines whether root key is fetched
    // Should be enabled while developing locally & disabled in production
    // The host
    host,
    dev: import.meta.env.DEV,
  },
})

export default ({authClient}) => (
  <Connect2ICProvider client={client}>
    <App/>
  </Connect2ICProvider>
)
