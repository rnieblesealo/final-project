import { SongCard } from "../components/SongCard";
import { supabase } from "../scripts/client"
import { getSpotifyTrack } from "../scripts/music-search"

import { useState, useEffect } from "react"

export const Home = () => {
  const [songCards, setSongCards] = useState(null)

  useEffect(() => {
    async function loadSongsWithReviews() {
      const { data } = await supabase
        .from('reviews')
        .select('review_track_id', { distinct: true }) // DISTINCT in Supabase

      if (!data) {
        return
      }

      // deduplicate
      const uniqueTrackIds = [...new Set(data.map(row => row.review_track_id))];

      const songCards = await Promise.all(
        uniqueTrackIds?.map(async (trackId) => {
          const {
            name: trackName,
            artists: [{ name: trackArtistName }],
            album: { images: [, { url: trackImage }] }
          } = await getSpotifyTrack(trackId)

          return (
            <SongCard
              key={trackId}
              name={trackName}
              artist={trackArtistName}
              rating={0}
              ratingCount={0}
              coverSrc={trackImage}
            />
          )
        }))

      setSongCards(songCards)
    }

    loadSongsWithReviews()

  }, [])


  return (
    <div className="px-10">
      {songCards}
    </div>
  )
}
