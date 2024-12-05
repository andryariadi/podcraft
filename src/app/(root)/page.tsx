import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

export default function Home() {
  return (
    <div className="b-rose-500">
      <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

      <div className="podcast_grid">
        {podcastData.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
