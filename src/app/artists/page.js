import React from 'react'
import Hero from '../../../components/Hero'
import ArtistsGrid from '../../../components/ArtistsGrid'

const page = () => {
  return (
    <div>
    <Hero />
      <div className='text-center'>
        <h2>All Artists</h2>
      </div>
      <ArtistsGrid />

    </div>
  )
}

export default page