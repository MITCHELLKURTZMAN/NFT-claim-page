# NFT-claim-page

A simple claim page for Kinic NFT holders.

## Features

Claim your Kinic Tokens using your Internet Identity Principal ID

## Built with

* Motoko - IC backend programming language.
* React.js - Javascript framework.
* Tailwind.css - Beautiful designs fast.
* DFX - developer tool for the IC.

## Getting Started

### Installation 

1. Clone the repository to your local machine using `git clone https://github.com/ICME-Lab/NFT-claim-page.git`
2. Navigate to the project directory using `cd repo`
3. Install the necessary dependencies using `npm install`

### Deployment

4. Start the development server using `sudo dfx start`
5. Create and deploy the main canister using `sudo dfx canister create assets && sudo dfx deploy main`
6. `npm run generate-declarations`
7. `node scripts/upload/uploader.js $(dfx canister id main) $(dfx identity whoami) ./arg.json`
8. Open the **package.json** file, delete the code on line 31 `"type": "module"`, and save the file.
9. View locally using `vite serve` 
