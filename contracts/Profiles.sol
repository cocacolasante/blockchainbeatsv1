// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Profiles{
    // admin address
    address public admin;

    // mapping of users to profiles
    mapping(address=> Profile) public allProfiles;

    // all profile address array
    address[] public profileAddresses;


    struct Profile{
        address userAddress;
        string username;
        uint likes; // number of likes a user gets
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
        profileAddresses.push(msg.sender);

    }

    // follow function
    function followOtherProfile(address profile) public {
        require(getProfileStructBool(profile, msg.sender) == false, "Profile: already following");
        
        Profile storage targetProfile = allProfiles[msg.sender];
        targetProfile.following.push(profile);

        Profile storage otherProfile = allProfiles[profile];
        otherProfile.likes++;
        otherProfile.hasLiked[msg.sender] = true;
        

    }

    // unfollow function to delete address from following array in profile struct, not eligant, but works
    
    function unfollowOtherProfile(address profile) public {
        require(getProfileStructBool(profile, msg.sender) == true, "Profile: not currently following");
        
        Profile storage targetProfile = allProfiles[msg.sender];


        for(uint i =0; i < targetProfile.following.length; i++){
            if(targetProfile.following[i] == profile){
                delete targetProfile.following[i];
            }
            
        }

        Profile storage otherProfile = allProfiles[profile];
        otherProfile.likes--;
        otherProfile.hasLiked[msg.sender] = false;
        

    }



    // add album to users profile albums array

    function addAlbum(address albumAddress) public {
        require(allProfiles[tx.origin].userAddress != address(0), "Profile: no profile created");
        _addAlbum(albumAddress, tx.origin);
    }

    // like a users profile function
    function likeProfile(address profile) public {
        require(allProfiles[msg.sender].userAddress != address(0), "Profile: no profile created");
        require(allProfiles[profile].userAddress != address(0), "Profile: no target profile");
        require(getProfileStructBool(profile, msg.sender) == false, "Profile: you currently like this profile");

        allProfiles[profile].likes++;
        allProfiles[profile].hasLiked[msg.sender] = true;
        
    }
    // TO DO CREATE UNLIKE PROFILE OPTION

    function unlikeProfile(address profile ) public {
        require(allProfiles[msg.sender].userAddress != address(0), "Profile: no profile created");
        require(getProfileStructBool(profile, msg.sender) == true, "Profile: you do not current like this profile");
        allProfiles[profile].likes--;
        allProfiles[profile].hasLiked[msg.sender] = false;
    }


    // internal setusername function
    function _setUsername(string memory _username, address addyToUpdate) internal{
        allProfiles[addyToUpdate].username = _username;
    }
    // internal add album function taking two parameters
    function _addAlbum(address albumAddress, address profileAddress) internal {
        allProfiles[profileAddress].albums.push(albumAddress);
    }


    // setters
    function setUsername(string memory _username) public {
        require(msg.sender == allProfiles[msg.sender].userAddress, "Profile: Only profile owner");
        _setUsername(_username, msg.sender);
    }




    // getter functions
    function getUsersFollowing(address profile) public view returns(address[] memory){
        return allProfiles[profile].following;
    }

    // return array of target profile albums
    function getUsersAlbums(address profile) public view returns(address[] memory){
        return allProfiles[profile].albums;
    }

    // get boolean mapping from struct
    function getProfileStructBool(address profile, address boolAddress ) public view returns(bool){
        return allProfiles[profile].hasLiked[boolAddress];
    }
    
}