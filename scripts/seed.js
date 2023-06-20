const hre = require("hardhat");

const profileJson = require( "../artifacts/contracts/Profiles.sol/Profiles.json")
const albumCreatorJson = require( "../artifacts/contracts/AlbumCreator.sol/AlbumCreator.json")


const ProfileContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const AlbumCreatorAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const fetchProfileContract = (signerOrProvider) =>{
    return new ethers.Contract(ProfileContractAddress, profileJson.abi, signerOrProvider)
}

const fetchAlbumContract = (signerOrProvider) =>{
    return new ethers.Contract(AlbumCreatorAddress, albumCreatorJson.abi, signerOrProvider)
}



const createProfileAndAlbum = async (ProfContract, AlbumCont, username, albumname, albumsymbol) =>{
    try{
        const createProfTx = await ProfContract.createProfile(username)
        await createProfTx.wait()

        console.log(`Profile created with tx hash ${createProfTx.hash.toString()}`)

        const createAlbumTx = await AlbumCont.createAlbumContract(albumname, albumsymbol, {value: hre.ethers.utils.parseEther("1")})
        await createAlbumTx.wait()

        console.log(`Album created at ${createAlbumTx.hash.toString()}`)

    }catch(err){
        console.log(err)
    }
}

async function main() {
    const [signer1, signer2, signer3] = await hre.ethers.getSigners()

    const ProfileContractSigner1 = fetchProfileContract(signer1)
    const AlbumContractSigner1 = fetchAlbumContract(signer1)

    createProfileAndAlbum(ProfileContractSigner1, AlbumContractSigner1, "cocacolasante", "cola test", "ct1")
    
    
    const ProfileContractSigner2 = fetchProfileContract(signer2)
    const AlbumContractSigner2 = fetchAlbumContract(signer2)
    createProfileAndAlbum(ProfileContractSigner2, AlbumContractSigner2, "tester2", "test2", "ts2")


    const ProfileContractSigner3 = fetchProfileContract(signer3)
    const AlbumContractSigner3 = fetchAlbumContract(signer3)
    createProfileAndAlbum(ProfileContractSigner3, AlbumContractSigner3, "tester3", "test3", "ts3")



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});