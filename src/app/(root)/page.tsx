"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PodcastCard from "@/components/PodcastCard";

export default function Home() {
  const trendingPodcasts = useQuery(api.pocasts.getTrendingPodcasts);

  return (
    <div className="b-rose-500">
      <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

      <div className="podcast_grid">
        {trendingPodcasts?.map((podcast) => (
          <PodcastCard
            key={podcast._id}
            podcast={{
              ...podcast,
              audioStorageId: podcast.audioStorageId ?? null,
              audioUrl: podcast.audioUrl ?? null,
              imageUrl: podcast.imageUrl ?? null,
              imageStorageId: podcast.imageStorageId ?? null,
            }}
          />
        ))}
      </div>
    </div>
  );
}
