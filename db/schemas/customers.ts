

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


const customers = pgTable("customers", {
    id: uuid("id")
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    image_url: varchar("image_url", { length: 255 }).notNull(),
});

export default customers;