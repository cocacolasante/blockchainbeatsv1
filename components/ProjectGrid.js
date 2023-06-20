import Card from "./Card"

const ProjectGrid = ({data, bgColor}) => {

  return (
    <div className={`${bgColor} pt-6`}>
        <div className="flex justify-center pb-6">
            <h2 className="text-3xl text-white ">Current Albums</h2>
            
        </div>
        <div className="grid grid-cols-4 gap-1 pb-6 pl-10">
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