import Hero from "../../components/Hero"
import ProjectGrid from "../../components/ProjectGrid"
import yellowconcert from "../../public/images/yellowconcert.png"

const dummyData = [
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: yellowconcert,
      albumSymbol: "TS1"
  },

]

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectGrid data={dummyData} />
    </>
  )
}
