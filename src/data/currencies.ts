export const currencies = [
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "GBP",
    name: "British Pound",
  },
  {
    code: "USD",
    name: "US Dollar",
  },
] as const;

export type Currency = (typeof currencies)[number]["code"];
