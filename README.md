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
1. Navigate to the project directory using `cd repo`
1. Install the necessary dependencies using `npm install`

### Deployment

1. backend

    1. `dfx deploy main --argument $(printf '%s' $(cat arg.json)) --upgrade-unchanged`

1. frontend

    1. Start the development server using `dfx deploy assets`
    1. View locally using `vite serve`
