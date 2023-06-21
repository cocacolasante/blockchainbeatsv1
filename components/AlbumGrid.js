"use client"
import React, {useState, useEffect, useContext} from 'react'
import { SmartContractContext } from "../context/SmartContractContext";
import AlbumCard from "./AlbumCard"
import yellowconcert from "../public/images/yellowconcert.png"

const AlbumGrid = ({albums, bgColor}) => {
    const [allAlbums, setAllAlbums] = useState()
    const [albumObjects, setAlbumObjects] = useState()
    const {fetchIndividualAlbumContract, RpcProvider} = useContext(SmartContractContext);
    
    const fetchAlbumsData = async () =>{
        let output = []
        for(let i = 0; i < albums.length; i++){
            const contract = await fetchIndividualAlbumContract(RpcProvider, albums[i])
            console.log(contract.address)
            const albumName = await contract.name()
            console.log(albumName)
            const albumArt = await contract.albumArtUri()
            console.log(albumArt)
            const artist = await contract.artist()
            console.log(artist)

            const newObj = {
                albumAddress: contract.address,
                albumName,
                albumArt,
                artist
            }
            console.log(newObj)
            output.push(newObj)
            
        }
        setAllAlbums(output)
        
    }

    useEffect(()=>{
        fetchAlbumsData()
    }, [] )
    

  return (
    <div className={`${bgColor} pt-6`}>
        <div className="flex justify-center pb-6">
            <h2 className="text-3xl text-white ">Current Albums</h2>
            
        </div>
        <div className="grid grid-cols-4 gap-1 pb-6 pl-10">
            
            {allAlbums && allAlbums.map((album, i) =>{
                console.log(album)   // this is just the address     
                return(
                    <AlbumCard  key={i} albumname={album.albumName} artistname={album.artist} albumart={album.albumart || yellowconcert} artistAddress={album.artist} albumAddress={album.albumAddress} />
                    
                )
            })}
        </div>
        
    </div>
  )
}

export default AlbumGrid