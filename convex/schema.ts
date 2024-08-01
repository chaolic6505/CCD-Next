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
        tokenIdentifier: v.string(),
        brand: v.optional(v.string()),
        title: v.optional(v.string()),
        series: v.optional(v.string()),
        subtitle: v.optional(v.string()),
        note: v.optional(v.string()),
        review: v.optional(v.number()),
        details: v.optional(v.string()),
        description: v.optional(v.string()),
        size_wanted: v.optional(v.string()),
        size_needed: v.optional(v.string()),
        pickup_location: v.optional(v.string()),
        size_purchased: v.optional(v.string()),
        purchase_method: v.optional(v.string()),
        purchased_date: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        money_saved: v.optional(v.number()),
        delivery_fee: v.optional(v.number()),
        purchased_price: v.optional(v.number()),
        original_price: v.optional(v.number()),
        discounted_price: v.optional(v.number()),
        percentage_saved: v.optional(v.number()),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
