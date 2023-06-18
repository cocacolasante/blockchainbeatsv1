// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Marketplace{
    address public admin;

    struct Listing{
        address currentOwner;
        uint price;
        ListingStatus status;
        
    }


    enum ListingStatus {forSale, sold, removed}


    constructor(){
        admin = msg.sender;
    }
}