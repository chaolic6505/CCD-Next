import { UsersIcon } from 'lucide-react';
import {
    uuid,
    text,
    unique,
    pgTable,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

import invoice from "./invoices";
import subscriptions from './subscriptions';

const users = pgTable(
    "users",
    {
        id: uuid("id")
            .notNull()
            .primaryKey()
            .default(sql`uuid_generate_v4()`),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        password: text("password").notNull().default(sql`'00000000'`),
        createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
        userId: varchar("user_id", { length: 255 }).notNull().default(sql`user_2gfs8voqQwlIuXC4cuu5ugMtfrj`),
        subscriptionId: varchar("subscription", { length: 255 }),
    },
    (table) => {
        return {
            users_email_key: unique("users_email_key").on(table.email),
        };
    }
);

export const userRelations = relations(users, ({ one, many }) => ({
    invoices: many(invoice),
    subscriptionId: one(subscriptions, {
        fields: [users.subscriptionId],
        references: [subscriptions.id],
    }),
}));

export default UsersIcon;