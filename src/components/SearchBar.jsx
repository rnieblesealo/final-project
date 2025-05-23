import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react"
import { getSpotifySongInfo } from "../scripts/music-search"
import { Link, useNavigate } from "react-router-dom"

export const SearchBar = () => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    async function getSongs() {
      const info = await getSpotifySongInfo(searchTerm)

      // ensure info exists
      if (!info) {
        console.error("Bad data")
        return
      }

      // if so set search results
      // FIXME: sometimes duplicate results occur, .filter them out
      setSearchResults(() => {
        const parsedData = info.map((entry) => {
          return {
            songId: entry.id,
            songName: entry.name,
            artistName: entry.artists[0].name,
            coverSrc: entry.album.images[1].url // lowest res image
          }
        })

        return parsedData
      }, [])
    }

    if (searchTerm) {
      getSongs()
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const SearchResult = ({ songId, songName, artistName, coverSrc }) => {
    function handleClick() {
      setSearchTerm("")
      navigate(`/view/${songId}`)
    }

    return (
      <button
        onClick={handleClick}
        className="w-full h-min rounded-lg p-3 cursor-pointer text-left">
        <div className="flex h-min">
          <img src={coverSrc} className="w-[64px] h-[64px] object-cover rounded-sm" />
          <div className="ml-2 flex flex-col">
            <span className="font-bold">{songName}</span>
            <span className="text-sm text-gray-500">{artistName}</span>
          </div>
        </div>
      </button>
    );
  };

  const searchResultItems = searchResults.map((result, index) => (
    <SearchResult
      key={`${result.artistName}-${index}`}
      songId={result.songId}
      songName={result.songName}
      artistName={result.artistName}
      coverSrc={result.coverSrc}
    />
  ))

  return (
    <div className="w-full flex justify-center">
      <div className="flex-col justify-start items-center bg-gray-950 p-3 w-80 h-min rounded-lg mb-4">
        <div className="w-full flex">
          <FaSearch className="ml-2 mr-4 text-xl text-gray-500" />
          <input
            type="text"
            id="name"
            name="name"
            size="10"
            placeholder="Search for a song..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none placeholder:text-gray-500" />
        </div>
        {searchResults.length > 0 &&
          <div className="mt-4 flex flex-col gap-1">
            {searchResultItems}
          </div>
        }
      </div>
    </div>
  );
};
