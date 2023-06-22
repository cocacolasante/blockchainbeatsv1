 "use client";

import { useState, useEffect, useContext } from "react"
import CreateProfile from "./CreateProfile";
import DisplayCurrentProfile from "./DisplayCurrentProfile";
import { SmartContractContext } from "../context/SmartContractContext";
import { dummyData } from "../dummydata/dummyData";
import DisplayActiveUsersAlbums from "./DisplayActiveUsersAlbums";

const Profile = () => {
    const {usersProfile, currentAccount} = useContext(SmartContractContext)

    const displayProfileOrCreate = () =>{
      if(usersProfile.username === "" && usersProfile.userAddress === "0x0000000000000000000000000000000000000000"){
        return <CreateProfile />
      } else {
        console.log(usersProfile)
        return <DisplayCurrentProfile username={usersProfile.username} userAddress={usersProfile.userAddress} likes={usersProfile.likes.toString()} albums={usersProfile.albums}/>
      }
    }

  return (
    <div className="text-center">
        {!usersProfile ? <p>Loading...</p> : displayProfileOrCreate()}
        {!usersProfile ? <p>Loading...</p> :  <DisplayActiveUsersAlbums albums={usersProfile.albums} />}
       
    </div>
  )
}

export default Profile