"use client"
import { useState, useEffect, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";

const CreateAlbumForm = () => {
    const [newAlbumName, setNewAlbumName] = useState()
    const [newSymbol, setNewSymbol] = useState()

    const {createAlbumContract} = useContext(SmartContractContext);

    const handleAlbumCreate = async (e) =>{
        e.preventDefault();

        try{
            if(!newAlbumName || !newSymbol){
                return;
            }
            await createAlbumContract(newAlbumName, newSymbol)
        }catch(err){
            console.log(err)

        }
    }

  return (
    <div>
        <form onSubmit={handleAlbumCreate}>
            <h2>Create Your Album</h2>
            <input onChange={e=>setNewAlbumName(e.target.value)} placeholder="Song name..." />
            <input onChange={e=>setNewSymbol(e.target.value)} placeholder="Album Symbol" />
            <button type="submit" >Create Album</button>
        </form>
    </div>
  )
}

export default CreateAlbumForm