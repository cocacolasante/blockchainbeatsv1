"use client";

import { useState, useEffect, useContext } from "react"
import CreateProfile from "./CreateProfile";
import DisplayProfile from "./DisplayProfile";
import { SmartContractContext } from "../context/SmartContractContext";
import { dummyData } from "../dummydata/dummyData";

const Profile = () => {
    const {usersProfile, currentAccount} = useContext(SmartContractContext)

    const displayProfileOrCreate = () =>{
      if(usersProfile.username === "" && usersProfile.userAddress === "0x0000000000000000000000000000000000000000"){
        return <CreateProfile />
      } else {
        return <DisplayProfile username={usersProfile.username} userAddress={usersProfile.userAddress} likes={usersProfile.likes.toString()} albums={dummyData}/>
      }
    }

  return (
    <div>
        <h1>Profile</h1>
        {!usersProfile ? <p>Loading...</p> : displayProfileOrCreate()}
        
    </div>
  )
}

export default Profile