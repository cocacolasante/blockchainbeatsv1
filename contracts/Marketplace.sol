// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {IAlbumNFT} from "./interfaces/IAlbumNFT.sol";

contract Marketplace{
    // contract admin
    address public admin;

    // listing number - unique identifier
    uint public totalListings;

    // array of all listings
    mapping(uint => Listing) public allListings;

    //song listing struct for nft cotnract of song and token id (song number)
    struct Listing{
        address listingOwner;
        address nftContract;
        uint tokenId;
        address originalArtist;
        uint price;
        ListingStatus status;
        uint listingNum;
        
    }

    // for listing status of a song
    enum ListingStatus {forSale, sold, removed}

    constructor(){
        admin = msg.sender;
    }

    // list song function
    function listSong(address targetAlbum, uint targetSong, uint listingPrice) public {
        // increment the total listings;
        totalListings++;
        uint currentListNum = totalListings;
        // verify the current owner of the song
        require(IAlbumNFT(targetAlbum).ownerOf(targetSong) == msg.sender, "Marketplace: Not owner of token");

        Listing memory newListing = Listing(msg.sender, targetAlbum, targetSong, IAlbumNFT(targetAlbum).artist(), listingPrice, ListingStatus.forSale, currentListNum );

        allListings[currentListNum] = newListing;
        //  transfer the nft from the user to the contract

        IAlbumNFT(targetAlbum).transferFrom(msg.sender, address(this), targetSong);

    }

    function cancelList(uint listingNum) public {
        require(allListings[listingNum].listingOwner == msg.sender, "Marketplace: Only owner" );
        Listing storage targetListing = allListings[listingNum];

        targetListing.status = ListingStatus.removed;
        targetListing.price = 0;

        IAlbumNFT(targetListing.nftContract).transferFrom(address(this), targetListing.listingOwner, targetListing.tokenId);


    }

    function purchaseSong(uint listingNum) public payable {
        require(msg.value >= allListings[listingNum].price, "Marketplace: Please pay total price");
        require(allListings[listingNum].listingOwner != msg.sender, "Marketplace: oner cannot purchase own song" );
        require(allListings[listingNum].status == ListingStatus.forSale, "Marketplace: Not for sale");
        Listing storage targetListing = allListings[listingNum];

        targetListing.status = ListingStatus.sold;

        // amount for original artist
        uint artistAmount = msg.value / 10;
        // amount for listing owner
        uint ownerAmount = msg.value - artistAmount;

        payable(targetListing.originalArtist).transfer(artistAmount);
        payable(targetListing.listingOwner).transfer(ownerAmount);
        IAlbumNFT(targetListing.nftContract).transferFrom(address(this), msg.sender, targetListing.tokenId);

        targetListing.listingOwner = msg.sender;

    }

}