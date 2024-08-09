import {
    uuid,
    text,
    date,
    unique,
    pgTable,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const customers = pgTable("customers", {
    id: uuid("id")
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    image_url: varchar("image_url", { length: 255 }).notNull(),
});

export const revenue = pgTable(
    "revenue",
    {
        month: varchar("month", { length: 4 }).notNull(),
        revenue: integer("revenue").notNull(),
    },
    (table) => {
        return {
            revenue_month_key: unique("revenue_month_key").on(table.month),
        };
    }
);

export const users = pgTable(
    "users",
    {
        id: uuid("id")
            .default(sql`uuid_generate_v4()`)
            .primaryKey()
            .notNull(),
        name: varchar("name", { length: 255 }).notNull(),
        email: text("email").notNull(),
        password: text("password").notNull(),
    },
    (table) => {
        return {
            users_email_key: unique("users_email_key").on(table.email),
        };
    }
);

export const invoices = pgTable("invoices", {
    id: uuid("id")
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
        amount: integer("amount"),
        customer_id: uuid("customer_id").notNull(),
        name: varchar("name", { length: 255 }),
        status: varchar("status", { length: 255 }),
        currency: varchar("currency", { length: 255 }),
        created_by: varchar("created_by", { length: 255 }),
        invoice_date: varchar("invoice_date", { length: 255 }),
    created_at: integer("created_at"),
    updated_at: integer("updated_at"),
});
