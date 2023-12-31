"use client"
import { useState, useEffect, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import {ethers} from "ethers"

const oneEther = ethers.utils.parseEther("1")

const CreateAlbumForm = () => {
    const [newAlbumName, setNewAlbumName] = useState()
    const [newSymbol, setNewSymbol] = useState()

    const {createNewAlbumContract, albumCreationCost} = useContext(SmartContractContext);

    const handleAlbumCreate = async (e) =>{
        e.preventDefault();

        try{
            if(!newAlbumName || !newSymbol){
                return;
            }
            const tx = await createNewAlbumContract(newAlbumName, newSymbol)
            
            
        }catch(err){
            console.log(err)

        }
    }

  return (
    <div className="p-10 text-center">
        <form onSubmit={handleAlbumCreate}>
            <h2>Create Your Album</h2>
            <input className="border" onChange={e=>setNewAlbumName(e.target.value)} placeholder="Album Name..." />
            <br />
            <input className="border" onChange={e=>setNewSymbol(e.target.value)} placeholder="Album Symbol..." />
            <br ></br>
            <button className="border shadow bg-zinc-400 border-slate-800" type="submit" >Create Album</button>
        </form>
    </div>
  )
}

export default CreateAlbumForm