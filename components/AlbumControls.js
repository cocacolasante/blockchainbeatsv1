"use client"
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import SongCard from './SongCard'

const AlbumControls = ({contract}) => {
    const [albumArt, setAlbumArt] = useState("")
    const [albumFinished, setAlbumFinished] = useState()
    const [artist, setArtist] = useState()
    const [totalNumSongs, setTotalNumSongs] = useState()
    const [totalTrackSongs, setTotalTrackSongs] = useState()
    const [ albumName, setAlbumName] = useState() 
    const [allSongs, setAllSongs] = useState([])
    const [trackList, setTrackList] = useState([])

    const getAllSong = async () =>{
        try{
            if(totalNumSongs == 0) return
            let songOutput = []
            for(let i = 1; i <= totalNumSongs; i ++){
                const song = await contract.allSongs(i)
                songOutput.push(song)
            }
            setAllSongs(songOutput)
            console.log({songOutput})
        }catch(err){
            console.log(err)
        }
    }

    const fetchCurrentAlbumData = async () =>{
        try{
            const tokenArtUri = await contract.albumArtUri()
            setAlbumArt(tokenArtUri)
            console.log(tokenArtUri)

            const finished = await contract.finished()
            setAlbumFinished(finished)
            console.log(finished)

            const address = await contract.artist()
            setArtist(address)
            console.log(address)

            const totalNum = await contract._tokenCount()
            setTotalNumSongs(totalNum.toString())
            console.log(totalNum.toString())

            const trackNum = await contract._trackCount()
            setTotalTrackSongs(trackNum.toString())
            console.log(trackNum.toString())

            const name = await contract.name()
            setAlbumName(name)
            console.log(name)

            // await getAllSong()

        }catch(err){
            console.log(err)
        }
    }


    const createSong = async (e) =>{
        e.preventDefault()
        if(albumArt.length == 0) return;

        try{

        }catch(err){
            console.log(err)
        }
    }


    const displayAlbumData = () =>{
        if(albumName.length == 0) {
            return(<p>Loading</p>)
        }
        return (
            <div>
                <div>
                    {albumArt.length == 0 ? <h2>Upload Album Art</h2> : <Image src={undefined} />}
                </div>
                <div>
                    <form onSubmit={createSong}>
                        <p>Create A Song</p>
                        <input type='text' placeholder='Song name' />
                        <input type='file' placeholder='Upload song' onChange={e=>setAlbumArt(e.target.value)} />
                        <button type='submit' >Create Song</button>
                    </form>
                    
                </div>
                <div>
                    <h3>{albumName}</h3>
                    <p>Total songs: {totalNumSongs}</p>
                    <p>Album Finished: {albumFinished}</p>

                </div>
                <div>
                    {!allSongs ? <p>Loading all songs...</p> : (
                        allSongs.map((song, i) =>{
                            return (
                                <SongCard key={i} name={song.name} creator={song.creator} songNum={song.tokenId.toString()} />
                            )
                        })
                    )}
                </div>
                    {!allSongs && allSongs.map((song, i) =>{
                        return (
                        <SongCard key={i} name={song.name} creator={song.creator} songNum={song.tokenId.toString()} />
                        )
                    }) }
            </div>
        )
    }



    useEffect(()=>{
        fetchCurrentAlbumData()
    }, [])

    useEffect(()=>{
        getAllSong()

    },[totalNumSongs])

  return (
    <>
        {albumName && displayAlbumData()}
    </>
  )
}

export default AlbumControls