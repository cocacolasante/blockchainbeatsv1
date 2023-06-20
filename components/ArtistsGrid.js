"use client"
import { useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import Card from "./Card";

const ArtistsGrid = () => {

    const {allArtists} = useContext(SmartContractContext);

  return (
    <div className="grid grid-cols-4 gap-1 p-6 bg-zinc-600">
        {console.log(allArtists)}
        {allArtists && allArtists.map((artist, i) =>{
          
            return <Card key={i} artistname={artist.username} albumname={artist.albums[0]} artistAddress={artist.userAddress} />
        })}
    </div>
  )
}

export default ArtistsGrid