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

          // count total reviews 
          const { data: ratingsArray, count } = await supabase
            .from('reviews')
            .select('rating', { count: 'exact' }) // don't fetch rows, just count
            .eq('review_track_id', trackId)

          // get average rating
          const averageRating = ratingsArray.length > 0
            ? Math.round(ratingsArray.reduce((sum, row) => sum + row.rating, 0) / ratingsArray.length)
            : 0

          console.log(averageRating)

          return (
            <SongCard
              key={trackId}
              trackId={trackId}
              name={trackName}
              artist={trackArtistName}
              rating={averageRating}
              ratingCount={count}
              coverSrc={trackImage}
            />
          )
        }))

      setSongCards(songCards)
    }

    loadSongsWithReviews()

  }, [])


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl text-center font-extrabold mb-4">All Songs</h1>
      <div className="px-10 grid grid-cols-2 w-100 min-w-100 gap-1">
        {songCards}
      </div>
    </div>
  )
}
