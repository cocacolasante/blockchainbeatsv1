import React from 'react'
import { DisplayAlbum } from '../../../../../components/DisplayAlbum'

const page = ({params}) => {
    const albumAddress = params.albumaddress

  return (
    <div>
        <DisplayAlbum albumAddress={albumAddress} />
    </div>
  )
}

export default page