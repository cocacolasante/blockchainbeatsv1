import Link from "next/link"

const CallToAction = () => {
  return (
    <div className='p-10 text-center'>
        <h2>Create Your Own Album Today!</h2>
        <Link href="/createanalbum" >Create Your Album</Link>
    </div>
  )
}

export default CallToAction