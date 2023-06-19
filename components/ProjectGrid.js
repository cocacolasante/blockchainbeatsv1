import Card from "./Card"

const ProjectGrid = ({data}) => {

  return (
    <div className="">
        <div className="flex justify-center pb-6">
            <h2>Current Albums</h2>
            
        </div>
        <div className="grid grid-cols-4 gap-1 pl-6">
        {/* mapping over dummy data for now */}
            {data.map((album, i) =>{
                return(
                    
                    <Card key={i} albumname={album.albumname} artistname={album.artistname} albumart={album.albumart} />
                    
                )
            })}
        </div>
        
    </div>
  )
}

export default ProjectGrid