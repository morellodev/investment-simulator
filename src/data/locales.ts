export const locales = ["en-US"] as const;

export type Locale = (typeof locales)[number];
