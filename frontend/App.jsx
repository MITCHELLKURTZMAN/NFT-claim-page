import React, { useState } from "react";
import "./index.css"
import "@connect2ic/core/style.css"

import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"
import { Form } from "./components/Form"
 
function App() {
  const [iiAddress, setIIAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
        setIsLoggedIn(true);
    },
    onDisconnect: () => {
        setIsLoggedIn(false);
    }
  })

  const claimNFT = (event) => {
    event.preventDefault();
    const iiAddressRegex = /^(?:[a-z0-9]{5}-){10}[a-z0-9]{3}$/;
    
    if (!iiAddress || iiAddress.length === 0) {
      alert("You must enter your II address.");
      return;
    } else if (!iiAddressRegex.test(iiAddress)) {
      alert("Please enter a valid II address in the correct format.");
      return;
    } else {
      alert("Thanks.");
      // Do something else with the valid iiAddress
    }
  }  

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
          claimNFT={claimNFT} 
          isLoggedIn={isLoggedIn}
        />

    </div>
  )
}

const client = createClient({
  canisters: {

  },
  providers: defaultProviders,
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
