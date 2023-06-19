"use client";

import { useState, useEffect, useContext } from "react"
import { SmartContractContext } from "../context/SmartContractContext";

const Profile = () => {
    const {usersProfile, currentAccount} = useContext(SmartContractContext)

  return (
    <div>
        <h1>Profile</h1>
        {!usersProfile ? <p>Loading..</p> : <>{usersProfile.address}</>}
        
    </div>
  )
}

export default Profile