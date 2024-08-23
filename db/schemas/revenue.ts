
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

const revenue = pgTable(
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

export default revenue;