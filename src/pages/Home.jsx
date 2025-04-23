import { SongCard } from "../components/SongCard";
import sampleSong from "../data/sample-song.json"

export const Home = () => {
  return (
    <div className="px-10">
      <SongCard
        name={sampleSong.name}
        artist={sampleSong.artist}
        rating={sampleSong.rating}
        ratingCount={sampleSong.ratingCount}
        coverSrc={sampleSong.coverSrc}
      />
    </div>
  )
}
