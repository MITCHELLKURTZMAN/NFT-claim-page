import React from "react"

const Form = ({ 
    iiAddress,
    setIIAddress,
    claimNFT
  }) => {

  return (

    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div class="flex shadow-lg rounded-lg z-50"> 
 
        <div class="flex flex-wrap content-center justify-center rounded-lg bg-white" style={{ width: "32rem", height: "32rem" }}>
          <div class="w-72">

            <h1 class="text-3xl font-bold"> Claim your NFT </h1>
            <small class="text-gray-400"> Enter your II Address below to claim ownership. </small>

            <form class="mt-8 mb-3" onSubmit={claimNFT}>
                <div class="mb-3">
                    <label class="mb-2 block text-xs font-semibold"> Enter II Address </label>
                    <input 
                    value={iiAddress} 
                    onChange={(event) => setIIAddress(event.target.value)}
                    placeholder="12345" 
                    class="block w-full rounded-md border border-gray-300 focus:border-purple-700 
                        focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                    />
                </div>

                <div class="mb-3">
                    <button type="submit"
                    class="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                    Claim your NFT!
                    </button>
                </div>
            </form>


          </div>
        </div>
    
      </div>
    </div>
  )
}

export { Form }