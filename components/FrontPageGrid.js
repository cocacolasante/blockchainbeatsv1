"use client";
import { useState, useEffect, useContext } from "react";
import ProjectGrid from "./ProjectGrid"
import { SmartContractContext } from "../context/SmartContractContext";

const FrontPageGrid = () => {

    const {allArtists} = useContext(SmartContractContext);

  return (
    <>  
    {allArtists && <ProjectGrid bgColor={"bg-zinc-600"} data={allArtists} />}
        
    </>
  )
}

export default FrontPageGrid