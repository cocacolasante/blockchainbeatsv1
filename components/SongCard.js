import React from 'react'

const SongCard = ({name, songUrl, creator, songNum}) => {
  return (
    <div className='p-6'>
        <h3>{name}</h3>
        {/* <p>{creator}</p> */}
        <p>{songNum}</p>
        <div>
            <audio controls >
                <source src={songUrl || "https://defibeats.infura-ipfs.io/ipfs/QmNbuA7YFkLhgHaFQ1UdqUh89ezpaNFAZaN4cQMoLh7YMD"}></source>
            </audio>

        </div>
    </div>
  )
}

export default SongCard