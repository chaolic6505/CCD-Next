export type Locale = (typeof locales)[number];
export const locales = ["en", "ru", "tch", "ch"] as const;
export const defaultLocale: Locale = "en";
