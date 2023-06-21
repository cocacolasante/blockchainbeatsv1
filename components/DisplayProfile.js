import Card from "./Card"
import AlbumGrid from "./AlbumGrid"

const DisplayProfile = (props) => {
  return (
    <div className="">
        <div className="justify-center pt-20 text-center align-middle h-screen/2 bg-zinc-400">
            <h2>{props.username}</h2>
            <p>{props.userAddress}</p>
            <p>Likes: {props.likes}</p>
        </div>
        <div>
        {props.albums && <AlbumGrid albums={props.albums} /> }
            
        </div>

    </div>
  )
}

export default DisplayProfile