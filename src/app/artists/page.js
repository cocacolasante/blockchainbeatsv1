import React from 'react'
import Hero from '../../../components/Hero'
import ArtistsGrid from '../../../components/ArtistsGrid'

const page = () => {
  return (
    <div>
    <Hero />
      <div className='text-center bg-zinc-600'>
        <h2 className='text-3xl'>All Artists</h2>
      </div> 
      <ArtistsGrid />

    </div>
  )
}

export default page