import CreatePodcastForm from "@/components/CreatePodcastForm";

const CreatePodcastPage = () => {
  return (
    <div className="bg-rose-500 space-y-8">
      <h1 className="text-20 font-bold text-white-1">Create a Podcasts</h1>

      {/* Form */}
      <CreatePodcastForm />
    </div>
  );
};

export default CreatePodcastPage;
