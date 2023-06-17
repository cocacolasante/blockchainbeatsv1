const { expect } = require("chai");
const {ethers} = require("hardhat")

const ALBUMNAME1 = "ALBUMNAME1"
const ALBUMSYM1 = "ALBUMSYM1"
const SONGNAME1 = "SONGNAME1"
const SAMEPLEURI = "SAMPLEURI"

describe("Album NFT Deployment", () =>{
    let AlbumNFT1, artist, user1, user2, user3, txn, res, song1 
    beforeEach(async () =>{
        [artist, user1, user2, user3] = await ethers.getSigners();

        const albumFactory1 = await ethers.getContractFactory("AlbumNFT")
        AlbumNFT1 = await albumFactory1.deploy(ALBUMNAME1, ALBUMSYM1 )
        await AlbumNFT1.deployed()

        // console.log(`Album deployed to ${AlbumNFT1.address}`)
    })
    it("checks the album's artist was set", async () =>{
        expect(await AlbumNFT1.artist()).to.equal(artist.address)
    })
    it("checks the name and symbol", async () =>{
        expect(await AlbumNFT1.name()).to.equal(ALBUMNAME1)
        expect(await AlbumNFT1.symbol()).to.equal(ALBUMSYM1)
    })
    it("checks the album art uri is set", async () =>{
        await AlbumNFT1.connect(artist).setAlbumArtUri(SAMEPLEURI)
        expect(await AlbumNFT1.albumArtUri()).to.equal(SAMEPLEURI)
    })
    describe("Create/manage Song Functions", () =>{

        beforeEach(async () => {
            txn = await AlbumNFT1.connect(artist).createSong(SONGNAME1, SAMEPLEURI)
            res = await txn.wait()
            song1 = await AlbumNFT1.allSongs(1);
            


        })
        it("checks the owner, token uri, token num, song name", async () =>{
            expect(song1.name).to.equal(SONGNAME1)
            expect(await AlbumNFT1.ownerOf(1)).to.equal(artist.address)
            expect(await AlbumNFT1.tokenURI(1)).to.equal(SAMEPLEURI)
            expect(await AlbumNFT1.getTokenCount()).to.equal(1)
        })
        it("checks the setting song to track list", async () =>{
            await AlbumNFT1.connect(artist).setSongToTrackList(1, 1)
            const track1 = await AlbumNFT1.trackList(1)
            song1 = await AlbumNFT1.allSongs(1);
            expect(track1.name).to.equal(song1.name)
            
            expect(track1.currentStatus).to.equal(song1.currentStatus);
        })
        it("checks song remove function", async () =>{
            await AlbumNFT1.connect(artist).removeSong(1);
            const track1 = await AlbumNFT1.trackList(1)
            song1 = await AlbumNFT1.allSongs(1);

            expect(track1.name).to.equal("")
            expect(song1.currentStatus).to.equal(2)
            expect(await AlbumNFT1._trackCount()).to.equal(0)
        })
    })

})