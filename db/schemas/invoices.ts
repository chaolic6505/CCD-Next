
import {
    uuid,
    text,
    serial,
    unique,
    pgTable,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const invoices = pgTable("invoices", {
    id: uuid("id")
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
        number: serial("number"),
        amount: integer("amount"),
        customer_id: uuid("customer_id").notNull(),
        status: varchar("status", { length: 255 }),
        currency: varchar("currency", { length: 255 }),
        image_url: varchar("image_url", { length: 255 }),
        created_by: varchar("created_by", { length: 255 }),
        invoice_name: varchar("invoice_name", { length: 255 }),
        invoice_date: varchar("invoice_date", { length: 255 }),
        created_at: integer("created_at"),
        updated_at: integer("updated_at"),
        tags: text('tags')
                .array()
                .notNull()
                .default(sql`'{}'::text[]`),
});

export default invoices;