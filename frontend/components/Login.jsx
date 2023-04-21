import React, { useState } from "react"
import Modal from "./Modal"
import iiLogo from "../assets/favicon.png"
import NFID from "../assets/NFID.svg"

export default function Login({
    setIsLoggedIn,
    setButtonPopup,
    setPageIsLoading,
    authClient
}) {
    const [showModal, setShowModal] = useState(true);

    const iiLogin = async (e) => {
      setButtonPopup(false);
      e.preventDefault();
      authClient.login({
        onSuccess: async () => {
          let identity = await authClient.getIdentity();
          sessionStorage.setItem("DFSid", authClient.getIdentity().getPrincipal().toText());
          checkOwner(authClient.getIdentity().getPrincipal().toText())
        },
        onError: async () => {
          navigate("/");
        },
      })
    };


    const checkOwner = async (id) => {
        setPageIsLoading(true);
        let firstLogin = await profile.firstLogin();
        let owner = await profile.whoIsOwner();

        if (location.port === '3000' || location.port === '8000') {
          setPageIsLoading(false);
          navigate("/dashboard");
          setIsLoggedIn(true);
          return;
        }
        
        if (owner !== id) {
          setPageIsLoading(false);
          navigate("/dashboard");
          setIsLoggedIn(true);
        } else {
          setPageIsLoading(false);
          navigate("/dashboard");
          setIsLoggedIn(true);
        }
    }

  return (
    <Modal trigger={showModal} setTrigger={setShowModal}>
      <div className="p-5 pb-8 mt-5">
          <h2 class="mb-4 text-xl sm:text-xl lg:text-2xl font-bold text-center"> Please log in to continue. </h2>
          <div class="mt-8 grid space-y-4 justify-center">

              <button 
                  onClick={iiLogin}
                  class="group h-12 px-6 border-2 border-gray-300 rounded-md transition duration-300
                  hover:border-purple-700 focus:bg-purple-50 active:bg-purple-100 w-[300px]">
                  <div class="relative flex items-center space-x-4 justify-center">
                      <img src={iiLogo} class="absolute left-0 w-6" />
                      <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                          group-hover:text-purple-900 sm:text-base"> 
                          Internet Identity 
                      </span>
                  </div>
              </button>

              <button 
                  class="group h-12 px-6 border-2 border-gray-300 rounded-md transition duration-300
                  hover:border-purple-700 focus:bg-purple-50 active:bg-purple-100 w-[300px]">
                  <div class="relative flex items-center space-x-4 justify-center">
                      <img src={NFID} class="absolute left-0 w-7" />
                      <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300
                          group-hover:text-purple-900 sm:text-base"> 
                          NFID
                      </span>
                  </div>
              </button>
          </div>
      </div>  
    </Modal>
  );
}

export { Login }