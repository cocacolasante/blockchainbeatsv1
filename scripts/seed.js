const hre = require("hardhat");

const profileJson = require( "../artifacts/contracts/Profiles.sol/Profiles.json")
const albumCreatorJson = require( "../artifacts/contracts/AlbumCreator.sol/AlbumCreator.json")
const albumNftJson = require("../artifacts/contracts/AlbumNFT.sol/AlbumNFT.json")


const ProfileContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const AlbumCreatorAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const fetchProfileContract = (signerOrProvider) =>{
    return new ethers.Contract(ProfileContractAddress, profileJson.abi, signerOrProvider)
}

const fetchAlbumCreatorContract = (signerOrProvider) =>{
    return new ethers.Contract(AlbumCreatorAddress, albumCreatorJson.abi, signerOrProvider)
}

// album num is the position in the album array
const fetchIndividualAlbumContract = async (signerOrProvider, usersAddress, albumNum, AlbumCreatorContract ) =>{
    const targetAlbumAddress = await AlbumCreatorContract.returnAlbumContract(usersAddress, albumNum)
    // console.log(targetAlbumAddress)

    return new ethers.Contract(targetAlbumAddress, albumNftJson.abi, signerOrProvider)
}



const createProfileAndAlbum = async (ProfContract, AlbumCont, username, albumname, albumsymbol) =>{
    try{
        const createProfTx = await ProfContract.createProfile(username)
        await createProfTx.wait()

        console.log(`Profile created with tx hash ${createProfTx.hash.toString()}`)

        const createAlbumTx = await AlbumCont.createAlbumContract(albumname, albumsymbol, {value: hre.ethers.utils.parseEther("1")})
        await createAlbumTx.wait()

        console.log(`Album created at txn hash ${createAlbumTx.hash.toString()}`)

    }catch(err){
        console.log(err)
    }
}

const makeSong = async (songname, tokenUri, AlbumContract ) => {
    try{
        return await AlbumContract.createSong(songname, tokenUri)
       

    }catch(err){

    }
}

async function main() {
    const [signer1, signer2, signer3] = await hre.ethers.getSigners()
    const provider = new hre.ethers.providers.JsonRpcProvider()

    const ProviderAlbumCreatorContract = fetchAlbumCreatorContract(provider)


    const ProfileContractSigner1 = fetchProfileContract(signer1)
    const AlbumCreatorContractSigner1 = fetchAlbumCreatorContract(signer1)
    await createProfileAndAlbum(ProfileContractSigner1, AlbumCreatorContractSigner1, "cocacolasante", "cola test", "ct1")
    
    
    const ProfileContractSigner2 = fetchProfileContract(signer2)
    const AlbumCreatorContractSigner2 = fetchAlbumCreatorContract(signer2)
    await createProfileAndAlbum(ProfileContractSigner2, AlbumCreatorContractSigner2, "tester2", "test2", "ts2")


    const ProfileContractSigner3 = fetchProfileContract(signer3)
    const AlbumCreatorContractSigner3 = fetchAlbumCreatorContract(signer3)
    await createProfileAndAlbum(ProfileContractSigner3, AlbumCreatorContractSigner3, "tester3", "test3", "ts3")

    const signer1Album1 = await fetchIndividualAlbumContract(signer1, signer1.address, 0, AlbumCreatorContractSigner1)

    console.log(`Signer1's Album deployed to ${signer1Album1.address}`)

    const song1 = await makeSong("NamedSong1", "SAMPLEURI", signer1Album1)
    await song1
    

    console.log(song1)
    





}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});