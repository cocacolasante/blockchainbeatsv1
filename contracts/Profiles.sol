// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Profiles{
    // admin address
    address private admin;

    // mapping of users to profiles
    mapping(address=> Profile) public allProfiles;

    // all profile address array
    address[] profileAddresses;


    struct Profile{
        address userAddress;
        string username;
        uint likes;
        address[] following; // addresses this profile is following
        address[] albums; // nft album array
        mapping(address=>bool) hasLiked; // other users if they have/havenot liked this profile
    }

    constructor(){
        admin = msg.sender;
    }

    // create profile function

    function createProfile(string memory _username) public{
        require(allProfiles[msg.sender].userAddress == address(0), "Profile: already created profile");

        allProfiles[msg.sender].userAddress = msg.sender;
        _setUsername(_username, msg.sender);
        
        

    }

    // setter
    function setUsername(string memory _username) public {
        require(msg.sender == allProfiles[msg.sender].userAddress, "Profile: Only profile owner");
        _setUsername(_username, msg.sender);
    }

    function _setUsername(string memory _username, address addyToUpdate) internal{
        allProfiles[addyToUpdate].username = _username;
    }
}