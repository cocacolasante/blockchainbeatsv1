import React from 'react'
import ManageAlbum from '../../../../../components/ManageAlbum'

const page = ({params}) => {
    const album = params.album
  return (
    <div>
        <ManageAlbum albumAddress={album} />
    </div>
  )
}

export default page