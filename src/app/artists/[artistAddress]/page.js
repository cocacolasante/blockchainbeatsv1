import ArtistsProfile from "../../../../components/ArtistsProfile";


const page = ({params}) => {
    const artistAddress = params.artistAddress;

    
  return (
    <div className='text-center'>
        <h1>Artists: {artistAddress} </h1>
        <ArtistsProfile userAddress={artistAddress} />
    </div>
  )
}

export default page