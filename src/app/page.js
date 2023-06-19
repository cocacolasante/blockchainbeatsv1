import Hero from "../../components/Hero"
import ProjectGrid from "../../components/ProjectGrid"

const dummyData = [
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
      albumSymbol: "TS1"
  },
  {
      artistname: "tester",
      albumname: "album1",
      albumart: "https://placehold.co/600x400/png",
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
