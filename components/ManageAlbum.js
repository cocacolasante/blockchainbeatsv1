"use client"
import React, {useState, useEffect, useContext} from 'react'
import Web3Modal from "web3modal"
import { ethers } from "ethers";
import { SmartContractContext } from "../context/SmartContractContext";
import AlbumControls from './AlbumControls';


const ManageAlbum = ({albumAddress}) => {
    const [currentAlbumContract, setCurrentAlbumContract] = useState()

    const {fetchIndividualAlbumContract} = useContext(SmartContractContext);


    const fetchAlbumsData = async () =>{
        
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        
        const albumContract = await fetchIndividualAlbumContract(signer, albumAddress)
        setCurrentAlbumContract(albumContract)
        console.log(albumContract)

    }

    useEffect(()=>{
        fetchAlbumsData()
    },[])



  return (
    <div>
        <h2>{albumAddress}</h2>
        {!currentAlbumContract ? <p>Loading...</p> : <AlbumControls contract={currentAlbumContract} /> }
    </div>
  )
}

export default ManageAlbum