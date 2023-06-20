import Card from "./Card"
import ProjectGrid from "./ProjectGrid"

const DisplayProfile = (props) => {
  return (
    <div className="">
        <div className="justify-center pt-20 text-center align-middle h-screen/2 bg-zinc-400">
            <h2>{props.username}</h2>
            <p>{props.userAddress}</p>
            <p>Likes: {props.likes}</p>
        </div>
        <div>
        {props.albums && <ProjectGrid data={props.albums} /> }
            
        </div>

    </div>
  )
}

export default DisplayProfile