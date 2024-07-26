import { description } from "./../components/charts/bar-graph";
import { GenericQueryCtx } from "convex/server";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { ConvexError, GenericId, v } from "convex/values";

export const getDocuments = query({
    args: {
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }
        const res = await ctx.db
            .query("documents")
            .withIndex("by_tokenIdentifier", (q) =>
                q.eq("tokenIdentifier", userId)
            )
            .collect();
            console.log("server identity", userId ,res);

        return res;
        if (args.orgId) {
            // const isMember = await hasOrgAccess(ctx, args.orgId);
            // if (!isMember) {
            //     return undefined;
            // }
            // return await ctx.db
            //     .query("documents")
            //     .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
            //     .collect();
        } else {
            // return await ctx.db
            //     .query("documents")
            //     .withIndex("by_tokenIdentifier", (q) =>
            //         q.eq("tokenIdentifier", userId)
            //     )
            //     .collect();
            // Query all documents belonging to the user
            // return await ctx.db
            //     .query("documents")
            //     .filter((q) => q.eq(q.field("tokenIdentifier"), userId))
            //     .collect();
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

export const insertDocuments = mutation({
    args: {
        documents: v.array(
            v.object({
                userId: v.number(),
                id: v.number(),
                title: v.string(),
                body: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return { success: false, message: "Not authenticated" };
        }
        for (const document of args.documents) {
            await ctx.db.insert("documents", {
                title: document.title,
                description: document.body,
                // Assuming other fields are optional and not provided by the API
                tokenIdentifier: userId,
            });
        }
        return { success: true, message: "Documents inserted successfully" };
    },
});

export const createDocument = mutation({
    args: {
        title: v.string(),
        orgId: v.optional(v.string()),
        description: v.optional(v.string()),
        fileId: v.optional(v.id("_storage")),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Not authenticated");
        }

        let documentId: Id<"documents">;
        documentId = await ctx.db.insert("documents", {
            title: args.title,
            fileId: args.fileId,
            tokenIdentifier: userId,
            description: args.description,
            orgId: args.orgId,
        });

        // if (args.orgId) {
        //     const isMember = await hasOrgAccess(ctx, args.orgId);
        //     if (!isMember) {
        //         throw new ConvexError(
        //             "You do not have access to this organization"
        //         );
        //     }

        //     documentId = await ctx.db.insert("documents", {
        //         title: args.title,
        //         fileId: args.fileId,
        //         description: "",
        //         orgId: args.orgId,
        //     });
        // } else {
        //     documentId = await ctx.db.insert("documents", {
        //         title: args.title,
        //         tokenIdentifier: userId,
        //         fileId: args.fileId,
        //         description: "",
        //     });
        // }

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

export const updateAllDocumentsTokenIdentifier = mutation({
    args: {},
    handler: async (ctx) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        const userId = userIdentity?.tokenIdentifier;

        // if (!userId) {
        //     return { success: false, message: "Not authenticated" };
        // }

        try {
            // Query all documents belonging to the user
            const userDocuments = await ctx.db
                .query("documents")
                // .filter((q) => q.eq(q.field("tokenIdentifier"), userId))
                .collect();

            if (userDocuments.length === 0) {
                return {
                    success: false,
                    message: "No documents found for the user",
                };
            }

            // Update all documents with the new tokenIdentifier
            const updatePromises = userDocuments.map((doc) =>
                ctx.db.patch(doc._id, {
                    tokenIdentifier:
                        "https://thorough-chipmunk-63.clerk.accounts.dev|user_2gfs8voqQwlIuXC4cuu5ugMtfr",
                })
            );

            await Promise.all(updatePromises);

            return {
                success: true,
                message: `Successfully updated tokenIdentifier for ${userDocuments.length} documents`,
                updatedCount: userDocuments.length,
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
                id: v.id("documents"),
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
                            message: "Document not found",
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

export const bulkEditDocuments = mutation({
    args: {
        edits: v.array(
            v.object({
                id: v.id("documents"),
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
                            message: "Document not found",
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
                        message: "Document updated successfully",
                    };
                })
            );

            const allSuccessful = results.every((result) => result.success);
            const message = allSuccessful
                ? "All documents updated successfully"
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
        documents: {
            document: {
                _id: GenericId<"documents">;
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
                documentId: GenericId<"documents">;
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
