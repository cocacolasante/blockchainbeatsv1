"use client"
import React, {useState, useEffect, useContext} from 'react'
import { SmartContractContext } from "../context/SmartContractContext";
import ProjectGrid from './ProjectGrid'

// used for artists public profile
export const DisplayAlbum = ({albumAddress}) => {
  const {fetchIndividualAlbumContract, RpcProvider} = useContext(SmartContractContext);

  const [albumData, setAlbumData] = useState()
  const [allSongs, setAllSongs] = useState([])

  const fetchAlbumData = async () =>{
    
    const AlbumContractProvider = await fetchIndividualAlbumContract(RpcProvider, albumAddress)

    // change token count to track list in production
    // DO NOT FORGET TO CHANGE FOR PRODUCTION
    const albumTrackCount = await AlbumContractProvider._tokenCount()
    console.log(albumTrackCount.toString())

    let allSongsArr = []
    for(let i = 0; i <= albumTrackCount; i++){
      const song = await AlbumContractProvider.allSongs(i)
      console.log(song)
      allSongsArr.push(song)
    }

    setAllSongs(allSongsArr)

  }

  useEffect(()=>{
    fetchAlbumData()
  }, [])

    
  return (
    <div>
        <h2>Album Address: {albumAddress}</h2>
        {allSongs && allSongs.map((song, i) =>{
          return (
            <div className='' key={i}>
              <h2>{song.name}</h2>
              
              
            </div>
          )
        }) }
    </div>
  )
}
