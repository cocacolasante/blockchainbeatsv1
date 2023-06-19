import React from 'react'
import Image from 'next/image'
import blueconcert from "../public/images/blueconcert.png"

const Card = (props) => {
  return (
    <div className=''>
      <div >
        <h2>{props.artistname}</h2>
        <h2>{props.albumname}</h2>
      </div>
      <div>
        <Image alt="album artwork" src={!props.albumart ? blueconcert : props.albumart} width={300} height={150} />
      </div>
      <div>
        <button >View Album</button>
      </div>
    </div>
  )
}

export default Card