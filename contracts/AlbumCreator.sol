// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./interfaces/iProfile.sol";
import "./AlbumNFT.sol";


contract AlbumCreator{
    // storing profiles contract address to use with interface to add nft colle
    address public ProfilesAddress;

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

    function createAlbumContract(string memory _albumName, string memory _albSym) public {
        AlbumNFT newAlbumContract = new AlbumNFT(_albumName, _albSym);
        IProfile(ProfilesAddress).addAlbum(address(newAlbumContract));

        AlbumContract memory newAlbum = AlbumContract(msg.sender, address(newAlbumContract), _albumName, _albSym);

        artistsAlbums[msg.sender].push(newAlbum);



    }

    


}