import Hero from "../../components/Hero"
import ProjectGrid from "../../components/ProjectGrid"
import yellowconcert from "../../public/images/yellowconcert.png"
import CallToAction from "../../components/CallToAction"
import FrontPageGrid from "../../components/FrontPageGrid"

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
      <CallToAction />
      <FrontPageGrid />
    </>
  )
}
