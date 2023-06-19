"use client"
import { useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import Card from "./Card";

const ArtistsGrid = () => {

    const {allArtists} = useContext(SmartContractContext);

  return (
    <div className="grid grid-cols-4 gap-1 pl-6">
        
        {allArtists && allArtists.map((artist, i) =>{
            return <Card key={i} artistname={artist.username} albumname={artist.albums[0]}  />
        })}
    </div>
  )
}

export default ArtistsGrid