//import { cropcontract_backend } from "../../declarations/cropcontract_backend";

//interner identity
import {
  createActor,
  cropcontract_backend,
} from "../../declarations/cropcontract_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
let actor = cropcontract_backend;
console.log(process.env.CANISTER_ID_INTERNET_IDENTITY);


const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
  e.preventDefault();
  let authClient = await AuthClient.create();
  // start the login process and wait for it to finish
  await new Promise((resolve) => {
    authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app"
          : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
      onSuccess: resolve,
    });
  });
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  actor = createActor(process.env.CANISTER_ID_CROPCONTRACT_BACKEND, {
    agent,
  });
  
  console.log(actor);

  // Emit events
  loginEmitter.emit('loginEvent', 'Login was successful!');


  // backend functions
  // get_principal
  console.log("Get principal:");
  const get_principal = await actor.get_principal();
  console.log(get_principal);
  // document.getElementById("output_test").innerHTML = get_principal;




  //Get buyer by principal
  console.log("Get buyer by principal:");
  const get_buyer_by_principal = await actor.get_buyer_by_principal(get_principal);
  console.log(get_buyer_by_principal);




  // get farmer by principal
  console.log("Get farmer by principal:");
  const get_farmer_by_principal = await actor.get_farmer_by_principal(get_principal);
  console.log(get_farmer_by_principal);




  // add buyer
  console.log("add buyer");
  const buyerPayload = {
    name: "John Doe",
    email: ['test@test.com'],
    phone_number: "1234567890",
    organization: ['wakanda'],
    location: "Cityville",
  };
  const add_buyer = await actor.add_buyer(buyerPayload);
  console.log(add_buyer);
  // const myArray = Object.values(add_buyer);
  // console.log(myArray[0]);



  // add farmer
  console.log("add farmer");
  const FarmerPayload = {
    name: "John Doe",
    email: ['test@test.com'],
    phone_number: "1234567890",
    organization: ['wakanda'],
    location: "Cityville",
    croptypes: ["maize", 'Beans', 'Millet'],
    size_of_land: 9908990,
    national_id: "786687898",
  };
  const add_farmer = await actor.add_farmer(FarmerPayload);
  console.log(add_farmer);

  // get all crop contracts
  console.log("Get all crop contracts");
  const get_all_crop_contracts = await actor.get_all_crop_contracts();
  console.log(get_all_crop_contracts);




  // get crop contracts by farmer id
  var farmer_id = 90909089798098;
  //const get_contracts_by_farmer = await actor.get_contracts_by_farmer(farmer_id);
  //console.log(get_contracts_by_farmer);



  // get crop contracts by buyer id
  var buyer_id = 90909089798098;
  //const get_contracts_by_buyer = await actor.get_contracts_by_buyer(buyer_id);
  //console.log(get_contracts_by_buyer);



  // create a new crop contract - farmer
  //console.log("create a new crop contract");
  const CropContractPayload = {
    farmer: 9867666690890809,
    crop: "Maize, Millet, Beans",
    land_size: 9908990,
    expected_yield: 3323,
    price_per_unit: 3322323,
    terms_and_conditions: 'my terms and conditions test@test.com',
    expected_month_of_harvest: "Dec",
    contract_status: ['wakanda'],
  };
  //const add_crop_contract = await actor.add_crop_contract(CropContractPayload);
  //console.log(add_crop_contract);



  //accept the crop contract
  var contractid = 7899879790;
  //const accept_contract = await actor.accept_contract(contractid);
  //console.log(accept_contract);





  return false;
};





//login event
function EventEmitter() {
  this.events = {};
}
EventEmitter.prototype.on = function (eventName, listener) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push(listener);
};
EventEmitter.prototype.emit = function (eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function (listener) {
      listener(data);
    });
  }
};

const loginEmitter = new EventEmitter();

// Register login listener
loginEmitter.on('loginEvent', handleLoginEvent);



async function makePostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Handle the response as needed
    // const responseData = await response.json();
    console.log(response);

  } catch (error) {
    console.log(error);
  }
}




