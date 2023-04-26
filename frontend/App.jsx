import React, { useState, useEffect } from "react";
import "@connect2ic/core/style.css";
import "./index.css";

import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react";
import { createClient } from "@connect2ic/core";
import { AstroX } from "@connect2ic/core/providers/astrox";
import { InfinityWallet } from "@connect2ic/core/providers";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
import { StoicWallet  } from "@connect2ic/core/providers";
import { Form } from "./components/Form";
import { Principal } from "@dfinity/principal";
import { getCrc32 } from "@dfinity/principal/lib/cjs/utils/getCrc.js";
import { sha224 } from "@dfinity/principal/lib/cjs/utils/sha224.js";
import { Buffer } from 'buffer';
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountNbr_0, setaccountNbr_0] = useState("");
  const [accountNbr_1, setaccountNbr_1] = useState("");
  const [accountNbr_2, setaccountNbr_2] = useState("");
  const [accountNbr_3, setaccountNbr_3] = useState("");
  const [accountNbr_4, setaccountNbr_4] = useState("");
  const [accountNbr_5, setaccountNbr_5] = useState("");
  const [principalID, setPrincipalID] = useState("");
  const [iiAddress, setIIAddress] = useState("");

  const { isConnected, principal, activeProvider } = useConnect({
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
      setaccountNbr_5(accountOfPrincipal(Principal.fromText(principal), 5).replace(/"/g, ''));
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
      Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, subaccount])
    );
    return accountNumber;
  };

  const claimTokens = (event) => {
    event.preventDefault();
    const iiAddressRegex = /^(?:[a-z0-9]{5}-){10}[a-z0-9]{3}$/;
    const confirmCheckbox = document.getElementById("confirm");
  
    if (!confirmCheckbox.checked) {
      alert("Please confirm that the wallet information is correct.");
      return;
    }
  
    if (!iiAddress || iiAddress.length === 0) {
      alert("You cannot leave this field blank.");
      return;
    } else if (!iiAddressRegex.test(iiAddress)) {
      alert("Please enter a valid principal in the correct format.");
      return;
    } else {
      alert("Thanks.");
      // Do something 
    }
  };

  return (
    <div className="App">
      <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen" id="kani"></div>
          <div className="auth-section">
            <ConnectButton />
          </div>
          <ConnectDialog />
          <Form 
            iiAddress={iiAddress}
            setIIAddress={setIIAddress}
            claimTokens={claimTokens} 
            isLoggedIn={isLoggedIn}
            accountNbr_0={accountNbr_0}
            accountNbr_1={accountNbr_1}
            accountNbr_2={accountNbr_2}
            accountNbr_3={accountNbr_3}
            accountNbr_4={accountNbr_4}
            accountNbr_5={accountNbr_5}
            principalID={principalID}
          />
    </div>
  )
}

const client = createClient({
  canisters: {

  },
  providers: [
    new AstroX(),
    new InfinityWallet(),
    new PlugWallet(),
    new StoicWallet()
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
