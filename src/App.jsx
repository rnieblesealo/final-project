import { SongCard } from "./components/SongCard";
import sampleSong from "./data/sample-song.json"

function App() {
  return (
    <div>
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

export default App
