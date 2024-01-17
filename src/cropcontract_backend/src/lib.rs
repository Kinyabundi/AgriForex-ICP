#[macro_use]
extern crate serde;
use candid::{CandidType, Principal};
use candid::{Decode, Encode};
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

//define enum for contract status
#[derive(candid::CandidType, Deserialize, Serialize, Clone, Debug, PartialEq)]
 enum ContractStatus {
    Active,
    Pending,
    Inactive,
    Completed,
    Terminated,
}

//define the struct for the farmer
#[derive(Clone, Debug, candid::CandidType, Deserialize, Serialize)]
 struct Farmer {
     name: String,
     email: Option<String>,
     phone_number: String,
     croptypes: Vec<String>,
     size_of_land: u64,
     location: String,
     national_id: String,
    created_at: u64,
    updated_at: Option<u64>,
    id: u64,
    principal: Principal,
}

// a trait to implement the farmer struct that is stored in a stable struct
impl Storable for Farmer {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(&self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

//a trait that must be implemented for a struct that is stored in a stable struct
impl BoundedStorable for Farmer {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

//define the struct for the farmer payload
#[derive(candid::CandidType, Deserialize, Serialize, Clone, Default, Debug)]
 struct FarmerPayload {
    name: String,
    email: Option<String>,
    phone_number: String,
    croptypes: Vec<String>,
    size_of_land: u64,
    location: String,
    national_id: String,
}

// define a struct for the buyers(people who buy the crops)
#[derive(candid::CandidType, Deserialize, Serialize, Clone, Debug)]
 struct Buyer {
    name: String,
    email: Option<String>,
    phone_number: String,
    organization: Option<String>,
    id: u64,
    location: String,
    principal: Principal,
}

//a trait that must be implemented for the buyer struct that is stored in a stable struct
impl Storable for Buyer {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(&self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

//a trait that must be implemented for a struct that is stored in a stable struct
impl BoundedStorable for Buyer {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

//define the struct for the buyer payload
#[derive(candid::CandidType, Deserialize, Serialize, Clone, Default, Debug)]
 struct BuyerPayload {
    name: String,
    email: Option<String>,
    phone_number: String,
    organization: Option<String>,
    location: String,
}


//define the struct for the cropcontract
#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
 struct CropContract {
     farmer: u64,
     crop: String,
     land_size: u64,
     expected_yield: u64,
     price_per_unit: u64,
     terms_and_conditions: String,
     expected_month_of_harvest: String,
     contract_status: ContractStatus,
    id: u64,
     buyer_accepted: bool,
     buyer : Option<Principal>,
}

//a trait that must be implemented for the cropcontract struct that is stored in a stable struct
impl Storable for CropContract {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(&self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

// a trait that must be implemented for a struct that is stored in a stable struct
impl BoundedStorable for CropContract {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

//define the struct for the cropcontract payload
#[derive(candid::CandidType, Deserialize, Serialize, Clone, Debug)]
 struct CropContractPayload {
    farmer: u64,
    crop: String,
    land_size: u64,
    expected_yield: u64,
    price_per_unit: u64,
    terms_and_conditions: String,
    expected_month_of_harvest: String,
    contract_status: ContractStatus,
}


thread_local! {
static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

static ID_COUNTER: RefCell<IdCell> = RefCell::new(
        IdCell::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0)
            .expect("Cannot create a counter")
    );

static STORAGE: RefCell<StableBTreeMap<u64, Farmer, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));

    static CROP_CONTRACT_STORAGE: RefCell<StableBTreeMap<u64, CropContract, Memory>> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))
    ));

    static BUYER_STORAGE: RefCell<StableBTreeMap<u64, Buyer, Memory>> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))
    ));
 }

// get the farmer by id
#[ic_cdk::query]
 fn get_farmer(id: u64) -> Result<Farmer, String> {
    match_get_farmer(&id).ok_or_else(|| format!("Farmer with id={} not found", id))
}

// create a new farmer
#[ic_cdk::update]
 fn add_farmer(payload: FarmerPayload) -> Option<Farmer> {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let farmer = Farmer {
        name: payload.name,
        email: None,
        phone_number: payload.phone_number,
        croptypes: payload.croptypes,
        size_of_land: payload.size_of_land,
        location: payload.location,
        national_id: payload.national_id,
        created_at: time(),
        updated_at: None,
        id,
        principal: ic_cdk::caller(),
    };
    do_insert_farmer(&farmer);
    Some(farmer)
}


 //helper method to perform the insert operation
fn do_insert_farmer(farmer: &Farmer) {
    STORAGE.with(|service| service.borrow_mut().insert(farmer.id, farmer.clone()));
}


// a helper method to get a message by id. used in get_message
fn match_get_farmer(id: &u64) -> Option<Farmer> {
    STORAGE.with(|service| service.borrow().get(id))
}

//get buyer by id
#[ic_cdk::query]
 fn get_buyer(id: u64) -> Result<Buyer, String> {
    match_get_buyer(&id).ok_or_else(|| format!("Buyer with id={} not found", id))
}

//create a new buyer
#[ic_cdk::update]
 fn add_buyer(payload: BuyerPayload) -> Option<Buyer> {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let buyer = Buyer {
        name: payload.name,
        email: None,
        phone_number: payload.phone_number,
        organization: None,
        location: payload.location,
        id,
        principal: ic_cdk::caller(),
    };
    do_insert_buyer(&buyer);
    Some(buyer)
}

// a helper method to get a buyer by id. used in get_buyer
fn match_get_buyer(id: &u64) -> Option<Buyer> {
    BUYER_STORAGE.with(|service| service.borrow().get(id))
}

//helper method to perform the insert operation
fn do_insert_buyer(buyer: &Buyer) {
    BUYER_STORAGE.with(|service| service.borrow_mut().insert(buyer.id, buyer.clone()));
}

//get crop contract by id
#[ic_cdk::query]
 fn get_crop_contract(id: u64) -> Result<CropContract, String> {
    match_get_crop_contract(&id).ok_or_else(|| format!("CropContract with id={} not found", id))
}


//get all crop contracts
#[ic_cdk::query]
 fn get_all_crop_contracts() -> Vec<CropContract> {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow().iter().map(|(_key, value)| value.clone()).collect())
}

//get crop contracts by contract status
#[ic_cdk::query]
 fn get_contracts_by_contract_status(contract_status: ContractStatus) -> Vec<CropContract> {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow().iter().map(|(_key, value)| value.clone()).filter(|contract| contract.contract_status == contract_status).collect())
}

//get crop contracts by farmer
#[ic_cdk::query]
 fn get_contracts_by_farmer(farmer: u64) -> Vec<CropContract> {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow().iter().map(|(_key, value)| value.clone()).filter(|contract| contract.farmer == farmer).collect())
}

//get crop contracts by buyer
#[ic_cdk::query]
 fn get_contracts_by_buyer(buyer: Principal) -> Vec<CropContract> {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow().iter().map(|(_key, value)| value.clone()).filter(|contract| contract.buyer == Some(buyer)).collect())
}

//create a new crop contract
#[ic_cdk::update]
 fn add_crop_contract(payload: CropContractPayload) -> Option<CropContract> {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let crop_contract = CropContract {
        farmer: payload.farmer,
        crop: payload.crop,
        land_size: payload.land_size,
        expected_yield: payload.expected_yield,
        price_per_unit: payload.price_per_unit,
        terms_and_conditions: payload.terms_and_conditions,
        expected_month_of_harvest: payload.expected_month_of_harvest,
        contract_status: ContractStatus::Pending,
        buyer: None,
        id,
        buyer_accepted: false,
    };
    do_insert_crop_contract(&crop_contract);
    Some(crop_contract)
}

// a hellper method to match the crop contract
fn match_get_crop_contract(id: &u64) -> Option<CropContract> {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow().get(id))
 }

 //helper method to perform the insert operation
 fn do_insert_crop_contract(crop_contract: &CropContract) {
    CROP_CONTRACT_STORAGE.with(|service| service.borrow_mut().insert(crop_contract.id, crop_contract.clone()));
 }

//accept the crop contract
#[ic_cdk::update]
 fn accept_contract(id: u64) -> Result<CropContract, String> {
    let mut crop_contract = match_get_crop_contract(&id).ok_or_else(|| format!("CropContract with id={} not found", id))?;
    crop_contract.buyer_accepted = true;
    crop_contract.contract_status = ContractStatus::Active;
    crop_contract.buyer = Some(ic_cdk::caller());
    do_insert_crop_contract(&crop_contract);
    Ok(crop_contract)
}

ic_cdk::export_candid!();


