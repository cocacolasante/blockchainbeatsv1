const { expect, assert } = require("chai");
const {ethers} = require("hardhat")
const albumAbi = require("../testutils/abis/AlbumNFT.abi.json")

const TESTUSERSNAME = "TESTUSERNAME"
const TESTALBNAME1 = "TESTALBNAME1"
const TESTSYMB1 = "TSMB1"
const addresszero = ethers.utils.getAddress("0x0000000000000000000000000000000000000000")

describe("Album creator contract deployment", () =>{
    let AlbumCreator, ProfilesContract, deployer, user1, user2, user3, firstAlbum, firstAlbumAddy, firstAlbumNftContract

    beforeEach(async () =>{
        [deployer, user1, user2, user3] = await ethers.getSigners();

        const profileContractFactory = await ethers.getContractFactory("Profiles")
        ProfilesContract = await profileContractFactory.deploy()
        await ProfilesContract.deployed()

        const albumCreatorFactory = await ethers.getContractFactory("AlbumCreator");
        AlbumCreator = await albumCreatorFactory.deploy(ProfilesContract.address);
        await AlbumCreator.deployed()

        // console.log(`Album creator deployed to ${AlbumCreator.address}`)
    })
    it("checks the admin of the albumcreator contract", async () =>{
        expect(await AlbumCreator.admin()).to.equal(deployer.address)
    })
    it("checks the profiles contract address", async () =>{
        expect(await AlbumCreator.ProfilesAddress()).to.equal(ProfilesContract.address)
    })
    describe("Create Album Contract Function", () =>{
        beforeEach(async ()=>{
            //user 1 creates a profile on the profile contract
            // then makes an album
            await ProfilesContract.connect(user1).createProfile(TESTUSERSNAME)

            await AlbumCreator.connect(user1).createAlbumContract(TESTALBNAME1, TESTSYMB1)
            firstAlbum = await AlbumCreator.artistsAlbums(user1.address, 0)
            firstAlbumAddy = firstAlbum.albumAddress;
            firstAlbumNftContract = new ethers.Contract(firstAlbumAddy, albumAbi.abi, user1 )
            
            
        })
        it("checks the new album was deployed", async () =>{
            
            expect(firstAlbum.artist).to.equal(user1.address)
            expect(firstAlbum.albumName).to.equal(TESTALBNAME1)
        })
        it("checks the album nft contract artist was assigned to user1", async() => {
            expect(await firstAlbumNftContract.artist()).to.equal(user1.address)
        })
        it("checks the album was added to the profile contract", async () =>{
            const profileAlbumArr = await ProfilesContract.getUsersAlbums(user1.address)
            expect(profileAlbumArr[0]).to.equal(firstAlbumAddy)
        })
    })
})