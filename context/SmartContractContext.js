"use client";
import React, {useState, useEffect, useContext} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal"


import { ProfileAbi, ProfileContractAddress, AlbumCreatorAbi, AlbumCreatorAddress, networkId, rpcConnection, AlbumNftAbi } from "./constants";

// fetch smart contracts
const fetchProfileContract = (signerOrProvider) =>{
    return new ethers.Contract(ProfileContractAddress, ProfileAbi, signerOrProvider)
}
const fetchAlbumContract = (signerOrProvider) =>{
    return new ethers.Contract(AlbumCreatorAddress, AlbumCreatorAbi, signerOrProvider)
}




export const SmartContractContext = React.createContext();

export const SmartContractProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState()

    const [allArtists, setAllArtists] = useState()

    const [usersProfile, setUsersProfile] = useState()
    // profiles contract functions

    const RpcProvider = new ethers.providers.JsonRpcProvider()

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

    // get users profile

    const fetchUsersProfile = async (address) =>{
        const provider = new ethers.providers.JsonRpcProvider()
        console.log(provider)

        const contract = fetchProfileContract(provider)
        console.log(contract)

        try{
            if(address == undefined){
                throw new Error("undefined address")
            }
            
            const usersProfile = await contract.getProfile(address)
            
            setUsersProfile(usersProfile)
           
        }catch(err){
            console.log(err)
        }
    }

    const getUsersProfile = async (address) =>{
        const provider = new ethers.providers.JsonRpcProvider()
        
        const contract = fetchProfileContract(provider)
        

        const usersProfile = await contract.getProfile(address);

        return usersProfile;

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
        const provider = new ethers.providers.JsonRpcProvider(rpcConnection, networkId)
        
        const contract = fetchProfileContract(provider)

        console.log(currentAccount)

        try{
            const profileAddressArray = await contract.getAllProfiles();

            const output = new Array();
            for(let i = 0; i < profileAddressArray.length; i++){
                const profile = await contract.getProfile(profileAddressArray[i])
                output.push(profile);

            }

            setAllArtists(output)
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



    const checkIfWalletIsConnected = async () =>{
        try{
            if(!window.ethereum){
                alert("please install metamask extension")
            }

            const accounts = await window.ethereum.request({method: "eth_accounts"})
            if(accounts.length){
                const currentUser = accounts[0];
    
                setCurrentAccount(currentUser);

                await fetchUsersProfile(currentUser);

            }

        }catch(err){
            console.log(err )
        }
    }
    
    useEffect(()=>{
        checkIfWalletIsConnected();
        getAllProfiles();
        
    }, [])


    const connectToWallet = async () =>{
        try{
            if(!window.ethereum){
                alert("please install metamask extension")
                
            }

            const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
            if(accounts.length){
                
    
                setCurrentAccount(accounts[0]);

            }

        }catch(err){
            console.log(err )
        }
    }

    // ================ get individual album function ========
    const fetchIndividualAlbumContract = async (signerOrProvider, albumAddress) =>{
        
    
        return new ethers.Contract(albumAddress, AlbumNftAbi, signerOrProvider)
    }

    return (
        <SmartContractContext.Provider
        value={({
            connectToWallet,
            checkIfWalletIsConnected,
            getUsersProfile,
            createAlbumContract,
            getAllProfiles,
            currentAccount,
            fetchUsersProfile,
            usersProfile,
            createUserProfile,
            allArtists,
            getAlbumsList,
            fetchIndividualAlbumContract,
            RpcProvider

        })}
        >{children}</SmartContractContext.Provider>

    )


}

export const useSmartContractContext = () => useContext(SmartContractContext)