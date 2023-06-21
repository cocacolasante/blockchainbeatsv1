import Image from 'next/image'
import React from 'react'
import blueConcert from "../public/images/blueconcert.png"
import Card from './Card'
import blueconcert from "../public/images/blueconcert.png"

const Hero = () => {
  return (
    <div className='justify-center w-full pt-10 h-screen/2'>
    <div className='text-center'>
        <h2 className='text-3xl'>Featured Album</h2>
      
    </div>
        <div className='flex justify-center align-middle'>
            <Card artistname="Cocacolasante" albumname="testing 2" albumart={blueconcert} artistAddress={"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}  />
            {/*  */}
        </div>

    </div>
  )
}

export default Hero