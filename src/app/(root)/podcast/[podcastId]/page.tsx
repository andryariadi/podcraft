type ParamsProp = Promise<{
  params: { [key: string]: string };
}>;

const PodcastDetailPage = async (props: ParamsProp) => {
  const { params } = await props;
  const podcastId = params.podcastId;

  console.log(podcastId, "<---dipodcastDetailPage");

  return <div>Podcast Detail Page for {podcastId}</div>;
};

export default PodcastDetailPage;
