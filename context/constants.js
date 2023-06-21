import profileJson from "../artifacts/contracts/Profiles.sol/Profiles.json"
import albumCreatorJson from "../artifacts/contracts/AlbumCreator.sol/AlbumCreator.json"
import marketplaceJson from "../artifacts/contracts/Marketplace.sol/Marketplace.json"
import albumNftJson from "../artifacts/contracts/AlbumNFT.sol/AlbumNFT.json"


export const ProfileContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const ProfileAbi = profileJson.abi;

export const AlbumCreatorAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
export const AlbumCreatorAbi = albumCreatorJson.abi;

export const MarketplaceAddress ="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
export const MarketplaceAbi = marketplaceJson.abi;

export const AlbumNftAbi = albumNftJson.abi


export const rpcConnection = "http://localhost:8545"
export const networkId = 31337