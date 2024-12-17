import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn, toastStyle } from "@/lib/utils";
import TextareaField from "./TextareaField";
import { motion } from "framer-motion";
import { BiLoaderCircle } from "react-icons/bi";
import { GenerateThumbnailProps } from "@/types";
import { Input } from "./ui/input";
import { LuCloudUpload } from "react-icons/lu";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { v4 as uuidv4 } from "uuid";

const GenerateThumbnail = ({ image, setImage, imagePrompt, setImagePrompt, setImageStorageId }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getImageUrl = useMutation(api.pocasts.getUrl);

  const generateThumbnail = useAction(api.openai.generateThumbnailAction);

  const handleGenareteImage = async () => {
    setIsGenerating(true);
    try {
      const res = await generateThumbnail({ prompt: imagePrompt });

      const blob = new Blob([res], { type: "image/png" });
      handleUploadImage(blob, `thumbnail-${uuidv4()}.png`);

      setIsGenerating(false);
      console.log({ res }, "<---handleGenareteImage");
    } catch (error) {
      console.log(error);
      toast.error("Error generating thumbnail", { style: toastStyle });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUploadImage = async (blob: Blob, fileName: string) => {
    setIsGenerating(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0] as { response: { storageId: Id<"_storage"> } }).response.storageId;
      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);

      setIsGenerating(false);
      toast.success("Thumbnail generated successfully", { style: toastStyle });

      console.log({ file, uploaded, storageId, imageUrl }, "<---handleUploadImage");
    } catch (error) {
      console.log(error);
      toast.error("Error generating image", { style: toastStyle });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUploadImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;

      if (!files) return;

      const file = files[0];

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleUploadImage(blob, file.name);

      console.log({ files, file, blob }, "<---dihandleUploadImageChange");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image", { style: toastStyle });
    }
  };

  console.log({ image }, "<---digenerateThumbnail");

  return (
    <div className="space-y-5">
      <div className="bg-sky-700 generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(!isAiThumbnail)}
          className={cn("", {
            "bg-black-6": isAiThumbnail,
          })}
        >
          AI prompt to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(!isAiThumbnail)}
          className={cn("", {
            "bg-black-6": !isAiThumbnail,
          })}
        >
          Upload custome image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className="bg-emerald-700 space-y-1">
          <div className="relative">
            <TextareaField id="imagePrompt" rows={5} cols={30} placeholder={`Provide text to AI to generate thumbnail`} value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />

            {/* {errors.imagePrompt && <p className="absolute -bottom-4 text-red-500 text-sm">{errors.imagePrompt.message as string}</p>} */}
          </div>

          <motion.button
            type="submit"
            disabled={isGenerating}
            className="max-w-44 w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white-2 font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenareteImage}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Generating</span>
                <BiLoaderCircle size={22} className="animate-spin mx-auto" />
              </div>
            ) : (
              <span className="text-sm">Generate Thumbnail</span>
            )}
          </motion.button>
        </div>
      ) : (
        <div className="bg-sky-700 image_div" onClick={() => imageRef.current?.click()}>
          <Input type="file" className="hidden" ref={imageRef} onChange={(e) => handleUploadImageChange(e)} />

          {!isGenerating ? (
            <LuCloudUpload size={42} className="text-gray-1 p-2 border-dashed border-[3px] border-gray-1 rounded-full hover:scale-110 transition-all duration-300" />
          ) : (
            <div className="text-gray-500 space-y-1">
              <span className="text-sm">Uploading</span>
              <BiLoaderCircle size={22} className="animate-spin mx-auto" />
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">SVG, PNG, JPG, or GIF (max. 1080x1080px)</p>
          </div>
        </div>
      )}

      {image && (
        <div className="flex-center w-full">
          <Image src={image} alt="thumbnail" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default GenerateThumbnail;
