import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { ConvexError, GenericId, v } from "convex/values";
import { GenericQueryCtx, paginationOptsValidator } from "convex/server";

export const getPaginatedCollections = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        const collections = await ctx.db
            .query("collections")
            .order("desc")
            .paginate(args.paginationOpts);
        return collections;
    },
});

export const getCollections = query({
    args: {
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }

        return ctx.db
            .query("collections")
            .withIndex("by_tokenIdentifier", (q) =>
                q.eq("tokenIdentifier", userId)
            ).collect;

        if (args.orgId) {
            // const isMember = await hasOrgAccess(ctx, args.orgId);
            // if (!isMember) {
            //     return undefined;
            // }
            // return await ctx.db
            //     .query("collections")
            //     .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
            //     .collect();
        } else {
            // return await ctx.db
            //     .query("collections")
            //     .withIndex("by_tokenIdentifier", (q) =>
            //         q.eq("tokenIdentifier", userId)
            //     )
            //     .collect();
            // Query all collections belonging to the user
            // return await ctx.db
            //     .query("collections")
            //     .filter((q) => q.eq(q.field("tokenIdentifier"), userId))
            //     .collect();
        }
    },
});

export const insertCollections = mutation({
    args: {
        collections: v.array(
            v.object({
                name: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return { success: false, message: "Not authenticated" };
        }

        for (const collection of args.collections) {
            await ctx.db.insert("collections", {
                name: collection.name,
                tokenIdentifier: userId,
            });
        }
        return { success: true, message: "Collections inserted" };
    },
});

export const createCollection = mutation({
    args: {
        name: v.string(),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        let documentId: Id<"collections">;
        documentId = await ctx.db.insert("collections", {
            name: args.name,
            tokenIdentifier: userId,
        });

        return { success: true, message: "Collection created" };

        // if (args.orgId) {
        //     const isMember = await hasOrgAccess(ctx, args.orgId);
        //     if (!isMember) {
        //         throw new ConvexError(
        //             "You do not have access to this organization"
        //         );
        //     }

        //     documentId = await ctx.db.insert("collections", {
        //         title: args.title,
        //         fileId: args.fileId,
        //         description: "",
        //         orgId: args.orgId,
        //     });
        // } else {
        //     documentId = await ctx.db.insert("collections", {
        //         title: args.title,
        //         tokenIdentifier: userId,
        //         fileId: args.fileId,
        //         description: "",
        //     });
        // }

        // await ctx.scheduler.runAfter(
        //     0,
        //     internal.collections.generateCollectionDescription,
        //     {
        //         fileId: args.fileId,
        //         documentId,
        //     }
        // );
    },
});

export const updateAllCollectionsTokenIdentifier = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return { success: false, message: "Not authenticated" };
        }
        try {
            // Query all collections belonging to the user
            const userCollections = await ctx.db
                .query("collections")
                // .filter((q) => q.eq(q.field("tokenIdentifier"), userId))
                .collect();

            if (userCollections.length === 0) {
                return {
                    success: false,
                    message: "No collections found for the user",
                };
            }

            // Update all collections with the new tokenIdentifier
            const updatePromises = userCollections.map((doc) =>
                ctx.db.patch(doc._id, {
                    tokenIdentifier: userId,
                })
            );

            await Promise.all(updatePromises);

            return {
                success: true,
                message: `${userId} + ${userCollections.length} collections`,
                updatedCount: userCollections.length,
            };
        } catch (error) {
            console.error("Error in bulk update:", error);
            return {
                success: false,
                message: "An error occurred during bulk update",
                error: String(error),
            };
        }
    },
});

export const bulkUpdateTokenIdentifier = mutation({
    args: {
        updates: v.array(
            v.object({
                id: v.id("collections"),
                tokenIdentifier: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        const userId = userIdentity?.tokenIdentifier;

        if (!userId) {
            return { success: false, message: "Not authenticated" };
        }

        try {
            const results = await Promise.all(
                args.updates.map(async (update) => {
                    const existingDoc = await ctx.db.get(update.id);

                    if (!existingDoc) {
                        return {
                            id: update.id,
                            success: false,
                            message: "Collection not found",
                        };
                    }

                    if (existingDoc.tokenIdentifier !== userId) {
                        return {
                            id: update.id,
                            success: false,
                            message: "Not authorized to edit this document",
                        };
                    }

                    await ctx.db.patch(update.id, {
                        tokenIdentifier: update.tokenIdentifier,
                    });
                    return {
                        id: update.id,
                        success: true,
                        message: "TokenIdentifier updated successfully",
                    };
                })
            );

            const allSuccessful = results.every((result) => result.success);
            const message = allSuccessful
                ? "All tokenIdentifiers updated successfully"
                : "Some updates failed";

            return {
                success: allSuccessful,
                message,
                results,
            };
        } catch (error) {
            console.error("Error in bulk update:", error);
            return {
                success: false,
                message: "An error occurred during bulk update",
                error: String(error),
            };
        }
    },
});

export const bulkEditCollections = mutation({
    args: {
        edits: v.array(
            v.object({
                id: v.id("collections"),
                updates: v.object({}),
            })
        ),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        const userId = userIdentity?.tokenIdentifier;

        if (!userId) {
            return { success: false, message: "Not authenticated" };
        }

        try {
            const results = await Promise.all(
                args.edits.map(async (edit) => {
                    const existingDoc = await ctx.db.get(edit.id);

                    if (!existingDoc) {
                        return {
                            id: edit.id,
                            success: false,
                            message: "Collection not found",
                        };
                    }

                    if (existingDoc.tokenIdentifier !== userId) {
                        return {
                            id: edit.id,
                            success: false,
                            message: "Not authorized to edit this document",
                        };
                    }

                    await ctx.db.patch(edit.id, edit.updates);
                    return {
                        id: edit.id,
                        success: true,
                        message: "Collection updated successfully",
                    };
                })
            );

            const allSuccessful = results.every((result) => result.success);
            const message = allSuccessful
                ? "All collections updated successfully"
                : "Some updates failed";

            return {
                success: allSuccessful,
                message,
                results,
            };
        } catch (error) {
            console.error("Error in bulk edit:", error);
            return {
                success: false,
                message: "An error occurred during bulk edit",
                error: String(error),
            };
        }
    },
});

function hasOrgAccess(
    ctx: GenericQueryCtx<{
        memberships: {
            document: {
                _id: GenericId<"memberships">;
                _creationTime: number;
                orgId: string;
                userId: string;
            };
            fieldPaths: ("orgId" | "userId" | "_creationTime") | "_id";
            indexes: {
                by_orgId_userId: ["orgId", "userId", "_creationTime"];
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
        collections: {
            document: {
                _id: GenericId<"collections">;
                _creationTime: number;
                orgId?: string | undefined;
                description?: string | undefined;
                files?: GenericId<"_storage">[] | undefined;
                fileId?: GenericId<"_storage"> | undefined;
                title: string;
            };
            fieldPaths:
                | "_id"
                | (
                      | "orgId"
                      | "_creationTime"
                      | "title"
                      | "description"
                      | "files"
                      | "fileId"
                  );
            indexes: { by_id: ["_id"]; by_creation_time: ["_creationTime"] };
            searchIndexes: {};
            vectorIndexes: {};
        };
        notes: {
            document: {
                _id: GenericId<"notes">;
                _creationTime: number;
                orgId?: string | undefined;
                embedding?: number[] | undefined;
                tokenIdentifier?: string | undefined;
                text: string;
            };
            fieldPaths:
                | (
                      | "orgId"
                      | "_creationTime"
                      | "text"
                      | "embedding"
                      | "tokenIdentifier"
                  )
                | "_id";
            indexes: {
                by_tokenIdentifier: ["tokenIdentifier", "_creationTime"];
                by_orgId: ["orgId", "_creationTime"];
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {
                by_embedding: {
                    vectorField: "embedding";
                    dimensions: number;
                    filterFields: "orgId" | "tokenIdentifier";
                };
            };
        };
        chats: {
            document: {
                _id: GenericId<"chats">;
                _creationTime: number;
                text: string;
                tokenIdentifier: string;
                documentId: GenericId<"collections">;
                isHuman: boolean;
            };
            fieldPaths:
                | (
                      | "_creationTime"
                      | "text"
                      | "tokenIdentifier"
                      | "documentId"
                      | "isHuman"
                  )
                | "_id";
            indexes: {
                by_documentId_tokenIdentifier: [
                    "documentId",
                    "tokenIdentifier",
                    "_creationTime",
                ];
                by_id: ["_id"];
                by_creation_time: ["_creationTime"];
            };
            searchIndexes: {};
            vectorIndexes: {};
        };
    }>,
    orgId: string
) {
    throw new Error("Function not implemented.");
}
