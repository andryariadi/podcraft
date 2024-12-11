import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    console.log("generateUploadUrl", args, ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
