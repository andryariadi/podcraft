"use client";

import { motion } from "framer-motion";
import { MdOutlineShortText } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { voiceDetails } from "@/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { podcastSchema } from "@/lib/validations";
import { useState } from "react";
import GeneratePodcast from "./GeneratePodcast";
import { Id } from "../../convex/_generated/dataModel";
import { VoiceType } from "@/types";
import GenerateThumbnail from "./GenerateThumbnail";

const CreatePodcastForm = () => {
  const [voiceType, setVoiceType] = useState<string>();
  const [voicePrompt, setVoicePrompt] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  // const [imagePrompt, setImagePrompt] = useState("");
  // const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  // const [imageUrl, setImageUrl] = useState("");

  const handleVoiceTypeChange = (voiceType?: string) => {
    setValue("voiceType", voiceType ?? "");
    setVoiceType(voiceType);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<z.infer<typeof podcastSchema>>({
    resolver: zodResolver(podcastSchema),
  });

  const handleSubmitForm: SubmitHandler<z.infer<typeof podcastSchema>> = async (data) => {
    console.log(data, "<----dihandleSubmitForm");
  };

  console.log({ voiceType, voicePrompt, audioUrl, audioStorageId, audioDuration }, "<----dicreatePodcastForm");

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-violet-500 grid grid-cols-1 gap-10">
      <div className="relative">
        <InputField icon={<MdOutlineShortText size={18} />} type="text" placeholder="Podcast Title" name="podcastTitle" propData={{ ...register("podcastTitle") }} />

        {errors.podcastTitle && <p className="absolute -bottom-6 text-red-500 text-sm">{errors.podcastTitle.message as string}</p>}
      </div>

      <div className="relative">
        <Select value={voiceType} onValueChange={handleVoiceTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI Voice" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {voiceDetails.map((voice) => (
                <SelectItem key={voice.id} value={voice.name}>
                  <div className="flex items-center gap-2 bg-black-3 border border-gray-700 p-1 rounded-lg">
                    <span>{voice.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.voiceType && voiceType === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">Voice type is {errors.voiceType.message as string}</p>}
      </div>

      <div className="relative">
        <TextareaField id="podcastDescription" rows={4} cols={30} placeholder={`Write a short description about the podcast`} propsData={{ ...register("podcastDescription") }} />

        {errors.podcastDescription && <p className="absolute -bottom-4 text-red-500 text-sm">{errors.podcastDescription.message as string}</p>}
      </div>

      <GeneratePodcast voiceType={voiceType as VoiceType} voicePrompt={voicePrompt} audio={audioUrl} setAudio={setAudioUrl} setAudioStorageId={setAudioStorageId} setVoicePrompt={setVoicePrompt} setAudioDuration={setAudioDuration} />

      <GenerateThumbnail />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white-2 font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? (
          <BiLoaderCircle size={22} className="animate-spin mx-auto" />
        ) : (
          <>
            <span>Submit & publish podcast</span>
            <BsSend size={18} />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default CreatePodcastForm;
