import { SongCard } from "../components/SongCard";
import sampleSong from "../data/sample-song.json"

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <h1 className="text-white text-4xl text-center font-extrabold m-6">Home</h1>

      <div className="px-10">
        <SongCard
          name={sampleSong.name}
          artist={sampleSong.artist}
          rating={sampleSong.rating}
          ratingCount={sampleSong.ratingCount}
          coverSrc={sampleSong.coverSrc}
        />
      </div>

    </div>
  )
}

export default Home
