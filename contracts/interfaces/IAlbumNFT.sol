// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

    // defining the song struct
struct Song{
    uint tokenId;
    address creator;
    string name;
    SongStatus currentStatus;
}

enum SongStatus{unpublished, albumSong, removed}



interface IAlbumNFT {
    
    function ownerOf(uint256 tokenId) external view returns (address owner);


    function approve(address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;

    function artist() external view returns(address);

    function allSongs(uint songNum) external view returns(Song memory);

}