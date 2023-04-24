import React, { useState } from "react"
import { ConnectButton } from "@connect2ic/react"
import Modal from "./Modal.jsx"
import kinicLogo from "../assets/kinic.svg"
import step2 from "../assets/step2.png"
import step3 from "../assets/step3.png"

const Form = ({ 
    iiAddress,
    setIIAddress,
    claimNFT,
    isLoggedIn,
  }) => {

    const [accountID, setAccountID] = useState("1234");
    const [principalID, setPrincipalID] = useState("123abc");
    const [openModal, setOpenModal] = useState(false);
  
    return (
        <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div class="flex shadow-lg rounded-lg z-50"> 

                {isLoggedIn ? (
                    <div class="flex flex-wrap content-center justify-center rounded-lg bg-white" style={{ width: "38rem", height: "38rem" }}>
                        <div class="w-full p-20">
                            <h1 class="text-4xl font-bold mb-5"> Claim your <img src={kinicLogo} class="mb-2 h-7 inline-flex" /> Tokens </h1>
                            
                            <label class="text-blue-800 text-lg uppercase font-black">What to do</label>
                            
                            <p class="block text-sm font-medium text-gray-900 mb-2"> 
                                <span class="font-black text-gray-700">1.</span> &nbsp;
                                Your account number and principal ID are displayed inside the blue box. 
                                Click the checkbox to confirm that they are correct.
                            </p>
                            <p class="block text-sm font-medium text-gray-900"> 
                                <span class="font-black text-gray-700">2.</span> &nbsp;
                                Enter your Internet Identity Principal ID and click Submit!
                            </p>
                            <span onClick={() => setOpenModal(true)}
                                class="block text-xs font-semibold text-blue-600 hover:underline cursor-pointer"> 
                                How do I find my Internet Identity Principal ID?
                            </span>

                            <div class="my-5 text-sm bg-blue-100 p-4 rounded-lg">
                                <p class="block"> <span class="font-bold uppercase">Account number:</span> {accountID}</p>
                                <p class="block"> <span class="font-bold uppercase">Principal ID:</span> {principalID}</p>

                                <span class="block mt-3 text-xs font-base"> 
                                    If the above is incorrect, please contact us on our Twitter page:&nbsp;
                                    <a href="https://twitter.com/kinic_app" target="blank" 
                                        class="font-semibold text-blue-600 hover:underline cursor-pointer">
                                        https://twitter.com/kinic_app
                                    </a>
                                </span>
                            </div>

                            <fieldset>
                                <div class="flex items-center items-start mb-5">
                                    <input 
                                        id="confirm" 
                                        type="checkbox" 
                                        class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" 
                                    />
                                    <label for="confirm" class="text-sm ml-3 font-medium text-gray-900">
                                        I confirm that the above addresses are correct.
                                    </label>
                                </div>
                            </fieldset>

                            <form class="mb-3" onSubmit={claimNFT}>
                                <div class="mb-3">
                                    <input 
                                        value={iiAddress} 
                                        onChange={(event) => setIIAddress(event.target.value)}
                                        placeholder="Enter your Internet Identity Address here." 
                                        class="block w-full rounded-md border border-gray-300 focus:border-purple-700 
                                            focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                                    />
                                </div>
                                <div class="mb-3">
                                    <button type="submit"
                                    class="mb-1.5 block w-full text-center text-white bg-gray-900 hover:ring-2 px-2 py-1.5 rounded-md">
                                    Submit!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> 
                ) : ( 
                    <div class="flex flex-wrap content-center justify-center rounded-lg bg-white" style={{ width: "38rem", height: "38rem" }}>
                        <h1 class="text-4xl font-bold mb-5"> Claim your <img src={kinicLogo} class="mb-2 h-7 inline-flex" /> Tokens </h1>
                        <h1 class="text-2xl font-bold mb-8"> Please connect to continue. </h1>
                        <div class="flex items-center justify-center w-full">
                            <ConnectButton style={{width: "310px", justifyContent: "center"}}/>
                        </div>
                    </div>
                )}

            </div>
            <Modal trigger={openModal} setTrigger={setOpenModal}>
                <div class="text-md">
                    <h1 class="text-blue-800 uppercase text-lg font-black mb-3">
                        How to find your Internet Identity Principal ID
                    </h1>

                    <p class="block font-medium text-gray-900 my-3"> 
                        <span class="font-black text-gray-700">1.</span> Sign in to your NNS Account here: 
                        <a href="https://nns.ic0.app/" target="blank"
                            class="ml-2 font-semibold text-blue-600 hover:underline cursor-pointer"> 
                            https://nns.ic0.app/
                        </a>
                    </p>

                    <p class="block font-medium text-gray-900 mb-1.5"> 
                        <span class="font-black text-gray-700">2.</span> Click the 'My Canisters' tab on the lefthand sidebar.
                    </p>
                    <img src={step2} class="mb-5 h-60 border border-gray-300 shadow-md rounded-xl" />

                    <p class="block font-medium text-gray-900 mb-1.5"> 
                        <span class="font-black text-gray-700">3.</span> Copy your principal under your 'Internet Computer' canister. 
                        <span class="block ml-5">This is your Internet Identity Principal ID.</span>
                    </p>
                    <img src={step3} class="mb-3 h-60 border border-gray-300 shadow-md rounded-xl" />
                </div>
            </Modal>
        </div>
    )
}

export { Form }