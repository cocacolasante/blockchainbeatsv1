import React from 'react'
import AlbumGrid from "./AlbumGrid";

const DisplayActiveUsersAlbums = ({albums}) => {
  return (
    <div>
        <AlbumGrid albums={albums} />
    </div>
  )
}

export default DisplayActiveUsersAlbums