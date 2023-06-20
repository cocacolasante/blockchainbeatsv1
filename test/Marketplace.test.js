const { expect } = require("chai");
const {ethers} = require("hardhat")


const ALBUMNAME1 = "ALBUMNAME1"
const ALBUMSYM1 = "ALBUMSYM1"
const SONGNAME1 = "SONGNAME1"
const SAMEPLEURI = "SAMPLEURI"


describe("Marketplace", () =>{
    let Marketplace, admin, user1, user2, user3, song1, txn

    beforeEach(async () =>{
        [admin, user1, user2, user3] = await ethers.getSigners()

        const marketplaceFactory = await ethers.getContractFactory("Marketplace")

        Marketplace = await marketplaceFactory.deploy()
        await Marketplace.deployed()

        // console.log(`Marketplace deployed to ${Marketplace.address}`)

    })
    it("checks the contract admin", async () =>{
        expect(await Marketplace.admin()).to.equal(admin.address)
    })
    describe("listing function", () =>{
        beforeEach(async () =>{
            // create nft album and song to list
            const albumFactory1 = await ethers.getContractFactory("AlbumNFT")
            AlbumNFT1 = await albumFactory1.deploy(ALBUMNAME1, ALBUMSYM1 )
            await AlbumNFT1.deployed()

            txn = await AlbumNFT1.connect(admin).createSong(SONGNAME1, SAMEPLEURI)
            await txn.wait()
            song1 = await AlbumNFT1.allSongs(1);

      

        })
        it("lists the token, checks token owner", async () =>{
            await AlbumNFT1.connect(admin).approve(Marketplace.address, 1)
            await Marketplace.connect(admin).listSong(AlbumNFT1.address, 1, ethers.utils.parseEther("1"))
            console.log(await Marketplace.allListings(1))

            expect(await AlbumNFT1.ownerOf(1)).to.equal(Marketplace.address)
            
            
        })
        it("checks the listing was canceled", async () =>{
            await AlbumNFT1.connect(admin).approve(Marketplace.address, 1)
            await Marketplace.connect(admin).listSong(AlbumNFT1.address, 1, ethers.utils.parseEther("1"))
            await Marketplace.connect(admin).cancelList(1)

            expect(await AlbumNFT1.ownerOf(1)).to.equal(admin.address)
        })
        it("checks the song was purchased", async () =>{
            await AlbumNFT1.connect(admin).approve(Marketplace.address, 1)
            await Marketplace.connect(admin).listSong(AlbumNFT1.address, 1, ethers.utils.parseEther("1"))
            await Marketplace.connect(user1).purchaseSong(1, {value: ethers.utils.parseEther("1")})

            expect(await AlbumNFT1.ownerOf(1)).to.equal(user1.address)
        })
        it("checks the funds were transferred", async () =>{
            await AlbumNFT1.connect(admin).approve(Marketplace.address, 1)
            await Marketplace.connect(admin).listSong(AlbumNFT1.address, 1, ethers.utils.parseEther("1"))
            let initialBalance = await ethers.provider.getBalance(admin.address)

            await Marketplace.connect(user1).purchaseSong(1, {value: ethers.utils.parseEther("1")})

            let finalBalance = await ethers.provider.getBalance(admin.address)
            expect(BigInt(finalBalance) - BigInt(initialBalance)).to.equal(ethers.utils.parseEther("1"))
        })

    })
})