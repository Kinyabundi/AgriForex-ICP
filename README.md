### AgriForex
## Overview
This project is a DAPP  built on the Internet Computer (IC) platform to manage crop contracts between farmers and buyers. The system allows farmers to create contracts for their crops, buyers to review and accept these contracts and provides a transparent and secure way to track the status of these agreements.

## Components
1. Farmer Struct
Represents a farmer with essential details such as name, contact information, land size, and more.
Stored in a stable structure for efficient retrieval and management.
2. Buyer Struct
Represents a buyer who purchases crops from farmers.
Contains details like name, contact information, and organization (optional).
Also stored in a stable structure for data consistency.
3. CropContract Struct
Represents a contract between a farmer and a buyer for a specific crop.
Includes details such as land size, expected yield, price per unit, and contract status.
Utilizes an enum type (ContractStatus) to track the status of the contract (e.g., Active, Pending, Inactive).
Usage
1. Adding a Farmer
Farmers can be added to the system by calling the add_farmer function and providing relevant information about the farmer in the FarmerPayload struct.
2. Adding a Buyer
Buyers can be added using the add_buyer function. Similar to adding farmers, buyers provide their details in the BuyerPayload struct.
3. Creating a Crop Contract
Farmers initiate crop contracts through the add_crop_contract function, specifying details in the CropContractPayload struct.
Contracts start with a status of "Pending" and require buyer acceptance.
4. Accepting a Crop Contract
Buyers can accept pending contracts using the accept_contract function by providing the contract ID.
This updates the contract status to "Active" and records the buyer's information.
5. Querying Information
Various query functions (get_farmer, get_buyer, get_crop_contract, etc.) allow users to retrieve information based on IDs, principals, or other criteria.
Data Storage
Data, including farmers, buyers, and crop contracts, is stored in stable structures using the provided StableBTreeMap and memory management system.
The system uses thread-local storage to manage memory and IDs for different types of data.

### Crop Analyzer AI
Analyze the crop image and get deficits.
To allow farmer make decision about their contracts

![Uploading image.png…]()


### HomePage

![image](https://github.com/Kinyabundi/AgriForex-ICP/assets/75924698/3dde522e-df0f-4a46-929d-7d5e8e6108f7)


![image](https://github.com/Kinyabundi/AgriForex-ICP/assets/75924698/cdc67b0e-a61f-4828-a7a7-b08e7f80816f)

![image](https://github.com/Kinyabundi/AgriForex-ICP/assets/75924698/2f1d1fd0-d475-42f8-81cf-8befe892a433)


## Running the project locally
```
### Prerequisites

- A connection to the internet.
- A command line interface.
- [Node.js](https://nodejs.org/en) (v18 or later downloaded and installed.)
- [DFINITY IC SDK,](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```
- dfx (v14 or later installed.)
  ```bash
  DFX_VERSION=0.15.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
  
  dfx --version

  echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
  ```
   
### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Kinyabundi/AgriForex-ICP
   
   cd AgriForex-ICP
   ```
   
2. **Install Dependencies:**

   ```bash
   npm install @dfinity/auth-client
   
   npm install
   ```
3. **Pull the interner identity canister using dfx deps:**
   ```bash
   dfx deps pull
   ```
4. **Initialize the canister:**
   ```bash
   dfx deps init internet_identity --argument '(null)'
   ```
5. **Deploy to Internet Computer:**

   ```bash
   dfx start --clean --background
   dfx deps deploy
   dfx deploy
   ```

# AgriForex-ICP
