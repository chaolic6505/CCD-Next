import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    memberships: defineTable({
        orgId: v.string(),
        userId: v.string(),
    }).index("by_orgId_userId", ["orgId", "userId"]),
    documents: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        tokenIdentifier: v.optional(v.string()),
        orgId: v.optional(v.string()),
        embedding: v.optional(v.array(v.float64())),
        files: v.optional(v.array(v.id("_storage"))),
        fileId: v.optional(v.id("_storage")),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
    // .index("by_orgId", ["orgId"])
    // .vectorIndex("by_embedding", {
    //     vectorField: "embedding",
    //     dimensions: 1536,
    //     filterFields: ["tokenIdentifier", "orgId"],
    // }),
    notes: defineTable({
        text: v.string(),
        orgId: v.optional(v.string()),
        embedding: v.optional(v.array(v.float64())),
        tokenIdentifier: v.optional(v.string()),
    })
        .index("by_tokenIdentifier", ["tokenIdentifier"])
        .index("by_orgId", ["orgId"])
        .vectorIndex("by_embedding", {
            vectorField: "embedding",
            dimensions: 1536,
            filterFields: ["tokenIdentifier", "orgId"],
        }),
    chats: defineTable({
        documentId: v.id("documents"),
        tokenIdentifier: v.string(),
        isHuman: v.boolean(),
        text: v.string(),
    }).index("by_documentId_tokenIdentifier", [
        "documentId",
        "tokenIdentifier",
    ]),

    collections: defineTable({
        name: v.string(),
        brand: v.string(),
        title: v.string(),
        original_price: v.number(),
        purchased_price: v.number(),
        money_saved: v.optional(v.number()),
        tags: v.optional(v.array(v.string())),
        discounted_price: v.optional(v.number()),
        percentage_saved: v.optional(v.number()),
        series: v.optional(v.string()),
        subtitle: v.optional(v.string()),
        description: v.optional(v.string()),
        size_purchased: v.string(),
        size_wanted: v.optional(v.string()),
        size_needed: v.optional(v.string()),
        purchase_method: v.string(),
        delivery_fee: v.optional(v.number()),
        pick_location: v.optional(v.string()),
        note: v.optional(v.string()),
        details: v.optional(v.string()),
        review: v.optional(v.string()),
        purchased_date: v.number(),
        created_at: v.number(),
        updated_at: v.number(),
    }),
});
