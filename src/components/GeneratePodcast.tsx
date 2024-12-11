import { BiLoaderCircle } from "react-icons/bi";
import TextareaField from "./TextareaField";
import { motion } from "framer-motion";
import { GeneratePodcastProps } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { generateUploadUrl } from "../../convex/files";

const useGeneratePodcast = ({ voiceType, voicePrompt, audio, setAudio, setAudioStorageId, setVoicePrompt, setAudioDuration }: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  console.log({ getPodcastAudio, generateUploadUrl, startUpload }, "<----diuseGeneratePodcast1");

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast.error("Please provide text to AI to generate audio", {
        style: toastStyle,
      });
      setIsGenerating(false);
    }

    try {
      const res = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([res], { type: "audio/mpeg" });
      const fileName = `podcast${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      console.log({ res, blob, fileName, file }, "<----diuseGeneratePodcast2");
    } catch (error) {
      console.log(error, "<---diuseGeneratePodcast");
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div className="bg-emerald-700 space-y-1">
      <div className="relative">
        <TextareaField id="voicePrompt" rows={5} cols={30} placeholder={`Provide text to AI to generate audio`} value={props.voicePrompt} onChange={(e) => props.setVoicePrompt(e.target.value)} />

        {/* {errors.voicePrompt && <p className="absolute -bottom-4 text-red-500 text-sm">{errors.voicePrompt.message as string}</p>} */}
      </div>

      <motion.button
        type="submit"
        disabled={isGenerating}
        className="max-w-40 w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white-2 font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        {isGenerating ? (
          <>
            <span className="text-sm">Generating</span>
            <BiLoaderCircle size={22} className="animate-spin mx-auto" />
          </>
        ) : (
          <span className="text-sm">Generate Podcast</span>
        )}
      </motion.button>

      {props.audio && <audio controls src={props.audio} autoPlay onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)} />}
    </div>
  );
};

export default GeneratePodcast;
