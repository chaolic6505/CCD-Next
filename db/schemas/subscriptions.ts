import { UsersIcon } from 'lucide-react';
import {
    uuid,
    text,
    unique,
    pgTable,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const subscriptions = pgTable(
    "subscriptions",
    {
        id: uuid("id")
            .notNull()
            .primaryKey()
            .default(sql`uuid_generate_v4()`),
            userId: varchar("user_id", { length: 255 }),
        name: varchar("name", { length: 255 }).notNull().default(sql`'Free'`),
        createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
        subscriptionId: varchar("subscription", { length: 255 }),
    }
);

export default subscriptions;