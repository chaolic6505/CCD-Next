
export type Locale = (typeof locales)[number];
export const locales = ['en', 'ru', 'ch'] as const;
export const defaultLocale: Locale = 'en';