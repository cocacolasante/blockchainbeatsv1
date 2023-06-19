import React, {useContext, useState} from 'react'

import { SmartContractContext } from "../context/SmartContractContext";

const CreateProfile = () => {

    const [newUsername, setNewUsername] = useState()

    const {createUserProfile} = useContext(SmartContractContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        try{
            await createUserProfile(newUsername)
            
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div >
        <div className='flex justify-center'>
            
            <h2>Create Profile</h2>
        </div>
        <div className='flex justify-center'>
            <form  onSubmit={handleSubmit} >
                <input onChange={e=>setNewUsername(e.target.value)} placeholder='Enter username' type="text" />
                <button type='submit'>Create Profile</button>
                
            </form>
        </div>
    </div>
  )
}

export default CreateProfile