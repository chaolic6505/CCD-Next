import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
    args: {
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            return undefined;
        }

        if (args.orgId) {
            // const isMember = await hasOrgAccess(ctx, args.orgId);
            // if (!isMember) {
            //     return undefined;
            // }

            return await ctx.db
                .query("documents")
                .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
                .collect();
        } else {
            return await ctx.db
                .query("documents")
                .withIndex("by_tokenIdentifier", (q) =>
                    q.eq("tokenIdentifier", userId)
                )
                .collect();
        }
    },
});

// export const getDocument = query({
//     args: {
//         documentId: v.id("documents"),
//     },
//     async handler(ctx, args) {
//         // const accessObj = await hasAccessToDocument(ctx, args.documentId);

//         // if (!accessObj) {
//         //     return null;
//         // }

//         return {
//             ...accessObj.document,
//             documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
//         };
//     },
// });

export const createDocument = mutation({
    args: {
        title: v.string(),
        fileId: v.id("_storage"),
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        let documentId: Id<"documents">;

        if (args.orgId) {
            // const isMember = await hasOrgAccess(ctx, args.orgId);
            // if (!isMember) {
            //     throw new ConvexError(
            //         "You do not have access to this organization"
            //     );
            // }

            documentId = await ctx.db.insert("documents", {
                title: args.title,
                fileId: args.fileId,
                description: "",
                orgId: args.orgId,
            });
        } else {
            documentId = await ctx.db.insert("documents", {
                title: args.title,
                tokenIdentifier: userId,
                fileId: args.fileId,
                description: "",
            });
        }

        // await ctx.scheduler.runAfter(
        //     0,
        //     internal.documents.generateDocumentDescription,
        //     {
        //         fileId: args.fileId,
        //         documentId,
        //     }
        // );
    },
});
