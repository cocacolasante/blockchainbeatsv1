import React from 'react'
import Image from 'next/image'
import blueconcert from "../public/images/blueconcert.png"
import Link from 'next/link'

const Card = (props) => {
  


  return (
    <div className=''>
      <div >
        <h2 className='text-2xl'>{props.artistname}</h2>
        <h2>{props.albumname}</h2>
      </div>
      <div>
        <Image alt="album artwork" src={!props.albumart ? blueconcert : props.albumart} width={300} height={150} />
      </div>
      <div>
        <Link href={`/artists/${props.artistAddress}`} >View Artist</Link>
      </div>
    </div>
  )
}

export default Card