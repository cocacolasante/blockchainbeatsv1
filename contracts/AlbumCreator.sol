// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./interfaces/iProfile.sol";


contract AlbumCreator{
    // storing profiles contract address to use with interface to add nft colle
    address public ProfilesAddress;

    address public admin;

    constructor(address _profileAddress){
        ProfilesAddress = _profileAddress;
        admin = msg.sender;

    }

    


}