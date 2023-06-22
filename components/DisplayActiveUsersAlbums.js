import React from 'react'
import AlbumGrid from "./AlbumGrid";

const DisplayActiveUsersAlbums = ({albums, profile}) => {
  return (
    <div>
        <AlbumGrid albums={albums} profile={profile} />
    </div>
  )
}

export default DisplayActiveUsersAlbums