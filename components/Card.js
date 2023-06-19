import React from 'react'
import Image from 'next/image'

const Card = (props) => {
  return (
    <div className=''>
      <div >
        <h2>{props.artistname}</h2>
        <h2>{props.albumname}</h2>
      </div>
      <div>
        <Image alt="album artwork" src={props.albumart} width={50} height={50} />
      </div>
      <div>
        <button >View Album</button>
      </div>
    </div>
  )
}

export default Card