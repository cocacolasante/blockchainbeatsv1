// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const profileContractFactory = await hre.ethers.getContractFactory("Profiles")
  const ProfilesContract = await profileContractFactory.deploy()
  await ProfilesContract.deployed()

  console.log(`Profile contract deployed to ${ProfilesContract.address}`)

  const albumCreatorFactory = await hre.ethers.getContractFactory("AlbumCreator")
  const AlbumCreatorContract = await albumCreatorFactory.deploy(ProfilesContract.address)
  await AlbumCreatorContract.deployed()

  console.log(`Album Creator deployed to ${AlbumCreatorContract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
