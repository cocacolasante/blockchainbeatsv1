import React from 'react'
import Image from 'next/image'
import blueconcert from "../public/images/blueconcert.png"
import Link from 'next/link'

const AlbumCard = (props) => {
  


  return (
    <div className=''>
      <div >
        <h2 className='text-2xl'>{props.artistname.slice(0, 4)}...{props.artistname.slice(-6)}</h2>
        <h2>{props.albumname}</h2>
      </div>
      <div>
        <Image alt="album artwork" src={!props.albumart ? blueconcert : props.albumart} width={300} height={150} />
      </div>
      <div>
      {!props.profile ? <Link href={`/artists/${props.artistAddress}/${props.albumAddress}`} >View Album</Link> :  <Link href={`/profile/managealbum/${props.albumAddress}`} >Manage Album</Link> }
       
      </div>
    </div>
  )
}

export default AlbumCard