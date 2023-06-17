const { expect } = require("chai");
const {ethers} = require("hardhat")

const USERNAME1 = "USERNAME1"
const RANDOMADDRESS = ethers.utils.getAddress("0x8ba1f109551bd432803012645ac136ddd64dba72")

describe("Profile contract Deployment", () =>{
    let ProfilesContract, deployer, user1,user2, user3, profile1, deployerProfile
    beforeEach(async()=>{
        [deployer, user1, user2, user3] = await ethers.getSigners();

        const profileContractFactory = await ethers.getContractFactory("Profiles")
        ProfilesContract = await profileContractFactory.deploy()
        await ProfilesContract.deployed()
        // console.log(`Profile Contract Deployed to ${ProfilesContract.address}`)
    })
    it("checks the admin", async () =>{
        expect(await ProfilesContract.admin()).to.equal(deployer.address)
    })
    describe("Creating a profile", () =>{
        beforeEach(async () =>{
            await ProfilesContract.connect(user1).createProfile(USERNAME1)
            await ProfilesContract.connect(user2).createProfile(USERNAME1)
            await ProfilesContract.connect(user3).createProfile(USERNAME1)
            profile1 = await ProfilesContract.allProfiles(user1.address)

            await ProfilesContract.connect(deployer).createProfile("Deployer")

        })
        it("checks the address were added to the address arr", async () =>{
            expect(await ProfilesContract.profileAddresses(0)).to.equal(user1.address)
        })
        it("checks the profiel struct", async ()=>{
            expect(profile1.username).to.equal(USERNAME1)
            expect(profile1.userAddress).to.equal(user1.address)
            expect(profile1.likes).to.equal(0)
            
            
        })
        it("checks the following other user function", async () =>{
            await ProfilesContract.connect(user1).followOtherProfile(deployer.address)
            profile1 = await ProfilesContract.allProfiles(user1.address)
            const followingArr = await ProfilesContract.getUsersFollowing(user1.address)
            expect(followingArr[0]).to.equal(deployer.address)
            expect(followingArr.length).to.equal(1)

            
        })
        it("checks that the other users struct was updated when followed", async ()=>{
            await ProfilesContract.connect(user1).followOtherProfile(deployer.address)
            // check the followed profile for likes and bool mapping
            deployerProfile = await ProfilesContract.allProfiles(deployer.address)
            // checks if user1 has liked deployer as true
            expect(await ProfilesContract.getProfileStructBool(deployer.address, user1.address)).to.equal(true)
        })

        it("checks the add album function", async () =>{
            await ProfilesContract.connect(user1).addAlbum(RANDOMADDRESS)
            const albumArr = await ProfilesContract.getUsersAlbums(user1.address)
            expect(albumArr.length).to.equal(1)
            expect(albumArr[0]).to.equal(RANDOMADDRESS)
        })
        it("checks the liked user function", async ()=>{
            await ProfilesContract.connect(user1).likeProfile(deployer.address)
            deployerProfile = await ProfilesContract.allProfiles(deployer.address)

            expect(deployerProfile.likes).to.equal(1)
            expect(await ProfilesContract.getProfileStructBool(deployer.address, user1.address)).to.equal(true);
            
        })
        it("checks the unfollow function", async () =>{
            await ProfilesContract.connect(user1).followOtherProfile(deployer.address)
            await ProfilesContract.connect(user1).followOtherProfile(user2.address)
            await ProfilesContract.connect(user1).followOtherProfile(user3.address)
            
            await ProfilesContract.connect(user1).unfollowOtherProfile(deployer.address)
            const followingArr = await ProfilesContract.getUsersFollowing(user1.address)

            console.log(followingArr, "manual check pass")
        })

    })
})