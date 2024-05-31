export const currencies = ["USD", "EUR", "GBP"] as const;

export type Currency = (typeof currencies)[number];
