"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  console.log(tasks, "<---dihome");

  return (
    <div className="b-rose-500">
      <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

      <div className="flex min-h-screen flex-col items-center justify-between p-24">{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</div>

      <div className="podcast_grid">
        {podcastData.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
