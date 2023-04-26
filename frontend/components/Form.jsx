import React, { useState } from "react";
import { ConnectButton } from "@connect2ic/react";
import Modal from "./Modal.jsx";
import kinicLogo from "../assets/kinic.svg";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";

const Form = ({ 
    iiAddress,
    setIIAddress,
    claimTokens,
    isLoggedIn, 
    accountNbr, 
    subAccountID,
    principalID
  }) => {

    const [openModal, setOpenModal] = useState(false);
  
    return (
        <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div class="flex shadow-lg rounded-lg z-50"> 

                {isLoggedIn ? (
                    <div class="flex flex-wrap content-center justify-center rounded-lg bg-white" style={{ width: "46rem", height: "44rem" }}>
                        <div class="w-full p-20">
                            <h1 class="text-5xl font-bold mb-5"> Claim your <img src={kinicLogo} class="mb-2 h-8 inline-flex" /> Tokens </h1>
                            
                            <label class="text-lg uppercase font-black">What to do</label>

                            <ol class="list-decimal ml-5 font-black text-sm text-gray-700">
                                <li>
                                    <p class="block text-sm font-medium text-gray-900 mb-2"> 
                                        Your wallet account number 
                                        {subAccountID === "" ? ' and ' : ', sub-account ID, and '}
                                        principal ID are displayed in the blue box below. 
                                        Click the checkbox to confirm that they are correct.
                                    </p>
                                </li>
                                <li>
                                <p class="block text-sm font-medium text-gray-900"> 
                                    Enter your Internet Identity Principal ID and click Submit!
                                </p>
                                <span onClick={() => setOpenModal(true)}
                                    class="block text-xs font-semibold text-blue-600 hover:underline cursor-pointer"> 
                                    How do I find my Internet Identity Principal ID?
                                </span>
                                </li>
                            </ol>

                            <div class="mt-5 text-sm bg-blue-100 p-6 rounded-lg">
                                <p class="block uppercase font-bold"> Account Number</p>
                                <p class="block mb-3 font-medium text-gray-600">{accountNbr}</p>
                                {subAccountID === "" ? '' : 
                                    <div>
                                        <p class="block uppercase font-bold"> Sub-Account ID</p>
                                        <p class="block mb-3 font-medium text-gray-600">{subAccountID}</p>
                                    </div>
                                }
                                <p class="block uppercase font-bold"> Principal ID</p>
                                <p class="block font-medium text-gray-600">{principalID}</p>
                            </div>

                            <span class="block mt-1 mb-5 text-xs font-base"> 
                                If the above is incorrect, please contact us on Twitter:&nbsp;
                                <a href="https://twitter.com/kinic_app" target="blank" 
                                    class="font-semibold text-blue-600 hover:underline cursor-pointer">
                                    https://twitter.com/kinic_app
                                </a>
                            </span>

                            <fieldset>
                                <div class="flex items-center items-start mb-3.5">
                                    <input 
                                        id="confirm" 
                                        type="checkbox" 
                                        class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" 
                                    />
                                    <label for="confirm" class="text-sm ml-3 font-medium text-gray-900">
                                        I confirm that the above information is correct.
                                    </label>
                                </div>
                            </fieldset>

                            <form class="mb-3" onSubmit={claimTokens}>
                                <div class="mb-3">
                                    <input 
                                        value={iiAddress} 
                                        onChange={(event) => setIIAddress(event.target.value)}
                                        placeholder="Enter your Internet Identity Principal ID here." 
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
                    <div class="flex flex-wrap content-center justify-center rounded-lg bg-white" style={{ width: "46rem", height: "44rem" }}>
                        <h1 class="text-5xl font-bold mb-5"> Claim your <img src={kinicLogo} class="mb-2 h-8 inline-flex" /> Tokens </h1>
                        <h1 class="text-2xl font-bold mb-8"> Please connect to continue. </h1>
                        <div class="flex items-center justify-center w-full">
                            <ConnectButton style={{width: "310px", justifyContent: "center"}}/>
                        </div>
                    </div>
                )}

            </div>
            <Modal trigger={openModal} setTrigger={setOpenModal}>
                <div class="text-md">
                    <h1 class="uppercase text-lg font-black mb-3"> How to find your Internet Identity Principal ID </h1>

                    <p class="block font-medium text-gray-900 my-3"> 
                        <span class="font-black text-gray-700">1.</span> Sign in to your NNS Account here: 
                        <a href="https://nns.ic0.app/" target="blank"
                            class="ml-2 font-semibold text-blue-600 hover:underline cursor-pointer"> 
                            https://nns.ic0.app/
                        </a>
                    </p>

                    <p class="block font-medium text-gray-900 mb-2"> 
                        <span class="font-black text-gray-700">2.</span> Click the 'My Canisters' tab on the lefthand sidebar.
                    </p>
                    <img src={step2} class="mb-5 h-60 border border-gray-300 shadow-md rounded-xl" />

                    <p class="block font-medium text-gray-900 mb-2"> 
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