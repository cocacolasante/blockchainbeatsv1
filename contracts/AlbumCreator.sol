// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./interfaces/iProfile.sol";
import "./AlbumNFT.sol";


contract AlbumCreator{
    // storing profiles contract address to use with interface to add nft colle
    address public ProfilesAddress;

    // cost to create an nft album
    uint public albumCost = 1 ether;

    address public admin;

    // mapping of address to album struct array
    mapping(address=> AlbumContract[]) public artistsAlbums;

    // contract struct for reference
    struct AlbumContract{
        address artist;
        address albumAddress;
        string albumName;
        string albumSymbol;
    }

    constructor(address _profileAddress){
        ProfilesAddress = _profileAddress;
        admin = msg.sender;

    }
    // creates album contract
    // creates a struct instance and stores in a general mapping of address to array of album addresses
    function createAlbumContract(string memory _albumName, string memory _albSym) public payable returns(address){
        require(msg.value >= albumCost, "AlbumCreator: insufficient funds");
        AlbumNFT newAlbumContract = new AlbumNFT(_albumName, _albSym);
        IProfile(ProfilesAddress).addAlbum(address(newAlbumContract));

        AlbumContract memory newAlbum = AlbumContract(msg.sender, address(newAlbumContract), _albumName, _albSym);

        artistsAlbums[msg.sender].push(newAlbum);

        payable(admin).transfer(msg.value);


        return address(newAlbumContract);


    }

    function setAlbumCost(uint newCost) public {
        require(msg.sender == admin, "AlbumCreator: only admin");
        albumCost = newCost;
    }

    


}