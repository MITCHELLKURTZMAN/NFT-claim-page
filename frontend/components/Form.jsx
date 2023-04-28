import React, { useState } from "react";
import { ConnectButton } from "@connect2ic/react";
import Modal from "./Modal.jsx";
import kinicLogo from "../assets/kinic.svg";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";

const Form = ({ 
    iiPrincipalID,
    setIIPrincipalID,
    claimTokens,
    isLoggedIn, 
    accountNbr_0, 
    accountNbr_1,
    accountNbr_2,
    accountNbr_3,
    accountNbr_4,
    principalID,
    handleAccountChange,
    selectedOption,
    selectedAccount,
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
                                        Your wallet information (account numbers and principal ID) are displayed in the blue box below. 
                                        Select the account number that you want to use.
                                    </p>
                                </li>
                                <li>
                                    <p class="block text-sm font-medium text-gray-900 mb-2"> 
                                        Click the checkbox to confirm that your wallet information is correct.
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

                            <div class="mt-7 text-sm bg-blue-100 p-6 rounded-lg">
                                <p className="block uppercase font-bold">Account Number</p>

                                <select className="mb-3 p-1.5 -mx-3 rounded-md bg-gray-50" onChange={handleAccountChange}>
                                    <option selected disabled>Select the account you want to use.</option>
                                    <option value="0">{accountNbr_0}</option>
                                    <option value="1">{accountNbr_1}</option>
                                    <option value="2">{accountNbr_2}</option>
                                    <option value="3">{accountNbr_3}</option>
                                    <option value="4">{accountNbr_4}</option>
                                </select>

                                <p className="block uppercase font-medium text-xs">Currently selected:</p>
                                {selectedAccount ? 
                                    <p className="block font-medium text-gray-600">{selectedAccount}</p>
                                     : 'Please select an account from the dropdown above.'
                                }

                                <p class="block uppercase font-bold mt-5"> Principal ID</p>
                                <p class="block font-medium text-gray-600">{principalID}</p>
                            </div>
                            

                            <span class="block mt-1 mb-7 text-xs font-base"> 
                                If the above is incorrect, please contact us on our Twitter page:&nbsp;
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
                                        value={iiPrincipalID} 
                                        onChange={(event) => setIIPrincipalID(event.target.value)}
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