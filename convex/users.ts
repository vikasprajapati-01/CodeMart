import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async ( ctx, args ) => {
    // Checking if the user already exists
    const existingUser = await ctx.db.query("users").filter((q) => q.eq(q.field("userId"), args.userId)).first();

    // If do not exist
    if(!existingUser) {
        await ctx.db.insert("users", {
            userId : args.userId,
            email : args.email,
            name : args.name,
            isPro : false
        });
    }
  },
});
