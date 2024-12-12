import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import TextareaField from "./TextareaField";
import { motion } from "framer-motion";
import { BiLoaderCircle } from "react-icons/bi";

const GenerateThumbnail = () => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
            <TextareaField id="imagePrompt" rows={5} cols={30} placeholder={`Provide text to AI to generate thumbnail`} />

            {/* {errors.imagePrompt && <p className="absolute -bottom-4 text-red-500 text-sm">{errors.imagePrompt.message as string}</p>} */}
          </div>

          <motion.button
            type="submit"
            disabled={isGenerating}
            className="max-w-44 w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white-2 font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <>
                <span className="text-sm">Generating</span>
                <BiLoaderCircle size={22} className="animate-spin mx-auto" />
              </>
            ) : (
              <span className="text-sm">Generate Thumbnail</span>
            )}
          </motion.button>
        </div>
      ) : (
        <div>Andry</div>
      )}
    </div>
  );
};

export default GenerateThumbnail;
