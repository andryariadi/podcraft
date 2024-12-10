import { z } from "zod";

export const podcastSchema = z.object({
  podcastTitle: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be at most 50 characters"),
  podcastDescription: z.string().min(2, "Description must be at least 2 characters").max(500, "Description must be at most 500 characters"),
  voiceType: z.string().min(2, { message: "Please select a voice type" }),
  //   voicePrompt: z.string().min(2),
  //   imagePrompt: z.string().min(2),
  //   imageUrl: z.string().url(),
});
