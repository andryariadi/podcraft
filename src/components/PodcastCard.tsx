import { PodcastProps } from "@/types";
import Image from "next/image";

const PodcastCard = ({ podcast }: { podcast: PodcastProps }) => {
  // console.log(podcast, "<---dipodcastCard");

  return (
    <figure className="bg-rose-700 space-y-2">
      <Image src={podcast.imageUrl} alt={podcast.podcastTitle} width={174} height={174} className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]" />

      <figcaption>
        <h3 className="text-16 truncate font-bold text-white-1">{podcast.podcastTitle}</h3>
        <p className="text-12 truncate fonnt-normal capitalize text-white-4">{podcast.podcastDescription}</p>
      </figcaption>
    </figure>
  );
};

export default PodcastCard;
