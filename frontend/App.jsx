import React, { useState } from "react";
import "./index.css"
import "@connect2ic/core/style.css"

import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider } from "@connect2ic/react"
import { Form } from "./components/Form"
import { Login } from "./components/Login"
 
function App() {
  const [iiAddress, setIIAddress] = useState("");

  const claimNFT = (event) => {
    event.preventDefault();
    if (!iiAddress || iiAddress.length  === 0) {
      alert("You must enter your II address.")
      return ;
    } else if (iiAddress.length !== 64 ) {
      alert("Please enter a valid II address. It must contain 64 characters.")
    } else {
      alert("thanks.")
    }
  }

  return (
    <div className="App">
      <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen" id="kani"></div>
      
        <div className="auth-section">
            <button class="py-2 px-5 rounded-full bg-gray-800 text-gray-100"> Sign out </button>
        </div>

        <Form 
          iiAddress={iiAddress}
          setIIAddress={setIIAddress}
          claimNFT={claimNFT} 
        />

        <Login />

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
