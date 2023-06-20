// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AlbumNFT is ERC721URIStorage{
    // state var bool for finished or unfinished album
    bool public finished;
    // artist of the album
    address public artist;

    // base album art uri
    string public albumArtUri;

    // token count which is the total songs minted to this collection
    uint private _tokenCount;
    // total number of tracks on track list
    uint public _trackCount;

    //mapping of token to song
    mapping(uint => Song) public allSongs;
    
    //mapping of songs to track list
    mapping(uint => Song) public trackList;

    // only artist modifier to restrict access to minting songs to album
    modifier onlyArtist {
        require(msg.sender == artist, "AlbumNFT: Only Artist can call function");
        _;
    }

    // completed album modifier
    modifier albumCompleted {
        require(finished == false, "AlbumNFT: album production finished");
        _;
    }

    // event for new song minted
    event NewSongMinted(address indexed _artist, uint indexed _tokenId, string _tokenUri);
    
    // defining the song struct
    struct Song{
        uint tokenId;
        address creator;
        string name;
        SongStatus currentStatus;
    }


    // defining enum of status of song
    // unpublished is not on the album, album is on the album and removed is a deleted song not to be released
    enum SongStatus{unpublished, albumSong, removed}

    // usng the name as the album name that the artist wants to call the album, setting the symbol as the album symbol
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
        artist = tx.origin;
    }

    // creating a song function
    function createSong(string memory _name, string memory tokenUri) public onlyArtist albumCompleted returns(uint){
        _tokenCount++;
        uint currentTokenNum = _tokenCount;

        _mint(msg.sender, currentTokenNum);
        _setTokenURI(currentTokenNum, tokenUri);

        Song memory newSong = Song(currentTokenNum, artist, _name, SongStatus.unpublished);

        allSongs[currentTokenNum] = newSong;

        emit NewSongMinted(artist, currentTokenNum, tokenUri);

        return currentTokenNum;
    }

    // ALBUM MANAGEMENT FUNCTIONS
    // set track list
    // param 1 is the song number form the allSongs mapping
    // param 2 is the spot you want to add it to the album track list
    function setSongToTrackList(uint songNum, uint trackSpot) public onlyArtist albumCompleted returns(bool){
        Song storage targetSong = _updateSongStatus(songNum, 1);

        trackList[trackSpot] = targetSong;
        
        return true;

    }

    // removing a song from production
    function removeSong(uint songNum) public onlyArtist albumCompleted returns(Song memory){
        Song storage targetSong = _updateSongStatus(songNum, 2);

        return targetSong;

    }
    
    // changing song status in allsong mapping
    function changeSongStatus(uint songNum, uint status) public onlyArtist albumCompleted returns(Song memory){
        Song memory targetSong = _updateSongStatus(songNum, status);
        return targetSong;
    }



    // internal remove song function abstraction
    // removed song from track list (if it is on the track list)
    // changes song status of song in allsongs mapping
    function _removeSong(uint songNum) internal returns(Song storage){
        Song storage targetSong = allSongs[songNum];

        if(targetSong.currentStatus == SongStatus.albumSong){
            for(uint i = 0; i <= _trackCount; i++){
                if(trackList[i].tokenId == targetSong.tokenId){
                    delete trackList[i];
                    _trackCount --;
                }
            }
        }
        targetSong.currentStatus = SongStatus.removed;

        return targetSong;



    }

    // internal set song status helper function
    function _updateSongStatus(uint songNum, uint songStatus) internal returns(Song storage){
        Song storage targetSong = allSongs[songNum];
        if(songStatus == 1){
            targetSong.currentStatus = SongStatus.albumSong;
            _trackCount++;

        } else if(songStatus == 2){
            _removeSong(songNum);
        } else{
            targetSong.currentStatus = SongStatus.unpublished;
        }
        return targetSong;
    }

    // set the global state on if production is finish
    // cannot be switched back to in production once completed
    function finishAlbum() public onlyArtist returns(bool){
        return finished = true;
    }

    // set the album artwork
    function setAlbumArtUri(string memory artUri) public onlyArtist albumCompleted returns(string memory){
        return albumArtUri = artUri;
    }


    // getters
    function getTokenCount() public view returns(uint){
        return _tokenCount;
    }


    
}