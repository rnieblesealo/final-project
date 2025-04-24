import { Rating } from "../components/Rating"
import { ReviewCard } from "../components/ReviewCard";

export const DetailView = () => {
  return (
    <div className="px-10">

      <div className="flex">
        <img src="/test_cover.jpg" className="w-60" />

        <div className="ml-5 flex flex-col">
          <span className="text-white text-4xl font-extrabold">Gravity Bong</span>
          <span className="text-3xl text-gray-600">Meth Wax</span>
          <Rating rating={9} size="md" />
        </div>
      </div>

      <div className="py-6">
        <ReviewCard
          username="rnieblesealo"
          rating={10}
          content='"Gravity Bong" by Meth Wax is the perfect soundtrack for zoning out. With its fuzzed-out guitars and dreamy, hypnotic rhythms, it feels like being enveloped in a cloud of smoke. The track has a loose, almost unhurried vibe, drawing you in with its heavy bassline and raw, gritty vocals. It’s a slow, psychedelic journey that doesn’t rush but builds effortlessly. Themes of escape and indulgence run through the lyrics, resonating deeply. It’s not just a song—it’s a mood, a vibe, a trip. Perfect for anyone looking to get lost in a haze of sound'
        />
      </div>

    </div>
  )
}
