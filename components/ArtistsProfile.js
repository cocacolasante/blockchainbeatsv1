"use client";
import { useContext, useState, useEffect } from "react";
import DisplayProfile from "./DisplayProfile"
import { SmartContractContext } from "../context/SmartContractContext";

const ArtistsProfile = ({userAddress}) => {
    const [currentArtist, setCurrentArtist] = useState()

    const {getUsersProfile} = useContext(SmartContractContext);

    const setUsersProfile = async () =>{
        const profile = await getUsersProfile(userAddress)
        setCurrentArtist(profile)

    }


    useEffect(()=>{
        setUsersProfile()
    }, [])

  return (
    <div>
    {console.log(currentArtist)}
    {currentArtist && <DisplayProfile userAddress={userAddress} likes={currentArtist.likes.toString()}  />}
        
    </div>
  )
}

export default ArtistsProfile