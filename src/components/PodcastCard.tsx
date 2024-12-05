import Image from "next/image";

type PodcastCardProp = {
  id: number;
  title: string;
  description: string;
  imgURL: string;
};
const PodcastCard = ({ podcast }: { podcast: PodcastCardProp }) => {
  console.log(podcast, "<---dipodcastCard");

  return (
    <figure className="bg-rose-700 space-y-2">
      <Image src={podcast.imgURL} alt={podcast.title} width={174} height={174} className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]" />

      <figcaption>
        <h3 className="text-16 truncate font-bold text-white-1">{podcast.title}</h3>
        <p className="text-12 truncate fonnt-normal capitalize text-white-4">{podcast.description}</p>
      </figcaption>
    </figure>
  );
};

export default PodcastCard;
