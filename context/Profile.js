import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal"

import { ProfileAbi, ProfileContractAddress, AlbumCreatorAbi, AlbumCreatorAddress } from "./constants";

// fetch smart contracts
const fetchProfileContract = (signerOrProvider) =>{
    new ethers.Contract(ProfileContractAddress, ProfileAbi, signerOrProvider)
}
const fetchAlbumContract = (signerOrProvider) =>{
    new ethers.Contract(AlbumCreatorAddress, AlbumCreatorAbi, signerOrProvider)
}

export const SmartContractContext = React.createContext();

export const SmartContractProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState()
    // profiles contract functions

    // create users profile function
    const createUserProfile = async (username) =>{
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchProfileContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.createProfile(username)
            const res = await tx.wait()

            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }

        }catch(error){
            console.log(error)

        }
    } 

    // follow artists profile function
    const followArtistsProfile = async (profile) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchProfileContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.followOtherProfile(profile)
            const res = await tx.wait()
            
            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }

        }catch(err){
            console.log(err)
        }
    }
    const unfollowArtistsProfile = async (profile) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchProfileContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.unfollowOtherProfile(profile)
            const res = await tx.wait()
            
            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }

        }catch(err){
            console.log(err)
        }
    }
    const likeArtistProfile = async (profile) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchProfileContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.likeProfile(profile)
            const res = await tx.wait()
            
            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }

        }catch(err){
            console.log(err)
        }
    }
    // unlike profile
    const unlikeArtistProfile = async (profile) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchProfileContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.unlikeProfile(profile)
            const res = await tx.wait()
            
            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }

        }catch(err){
            console.log(err)
        }
    }


    // get users following list
    const getFollowersList = async (profile) => {
        const provider = new ethers.providers.JsonRpcProvider()

        const contract = fetchProfileContract(provider)

        console.log(currentAccount)

        try{
            const followingList = await contract.getUsersFollowing(profile)
            return followingList

        }catch(err){
            console.log(err)
        }
    }
    // get users album list
    const getAlbumsList = async (profile) => {       
        const provider = new ethers.providers.JsonRpcProvider()
        
        const contract = fetchProfileContract(provider)

        console.log(currentAccount)

        try{
            const albumList  = await contract.getUsersAlbums(profile)
            const parsedAlbumList = albumList.map((album, i)=>{
                return({
                    artist: album.artist,
                    albumAddress: album.albumAddress,
                    albumName: album.albumName,
                    symbol: album.albumSymbol
                })
            }) 

            return parsedAlbumList
            

        }catch(err){
            console.log(err)
        }
    }


    const getAllProfiles = async () =>{
        const provider = new ethers.providers.JsonRpcProvider()
        
        const contract = fetchProfileContract(provider)

        console.log(currentAccount)

        try{
            const profileAddressArray = await contract.getAllProfiles();

            const output = new Array();
            for(let i = 0; i < profileAddressArray.length; i++){
                profile = await contract.allProfiles(profileAddressArray[i])
                output.push(profile);

            }

            return output;

            

        }catch(error){
            console.log(error)
        }
    }



    // ALBUM CREATOR FUNCTIONS

    const createAlbumContract = async (albumName, symbol) =>{
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = fetchAlbumContract(signer)

        console.log(currentAccount)

        try{
            const tx = await contract.createAlbumContract(albumName, symbol)
            const res = await tx.wait()
            
            if(res.status ==1){
                console.log("transaction completed")
            } else{
                console.log("transaction failed")
            }
        }catch(error){
            console.log(error)
        }
    }
    


}