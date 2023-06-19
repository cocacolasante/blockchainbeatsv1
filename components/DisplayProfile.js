import Card from "./Card"
import ProjectGrid from "./ProjectGrid"

const DisplayProfile = (props) => {
  return (
    <div>
        <div className="text-center">
            <h2>{props.username}</h2>
            <p>{props.userAddress}</p>
            <p>Likes: {props.likes}</p>
        </div>
        <div>
            <ProjectGrid data={props.albums} />
        </div>

    </div>
  )
}

export default DisplayProfile