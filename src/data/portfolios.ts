export type Portfolio = {
  id: string;
  name: string;
  description: string;
  yoyReturn: number;
  composition: {
    stocks: number;
    bonds: number;
  };
};

export const portfolios: ReadonlyArray<Portfolio> = [
  {
    id: "conservative",
    name: "Conservative",
    description:
      "Primarily bonds with some low-risk stocks (80% bonds, 20% stocks)",
    yoyReturn: 0.05,
    composition: {
      stocks: 0.2,
      bonds: 0.8,
    },
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Even mix of stocks and bonds (50% stocks, 50% bonds)",
    yoyReturn: 0.075,
    composition: {
      stocks: 0.5,
      bonds: 0.5,
    },
  },
  {
    id: "high-yield",
    name: "High Yield",
    description: "Mostly stocks with some bonds (80% stocks, 20% bonds)",
    yoyReturn: 0.1,
    composition: {
      stocks: 0.8,
      bonds: 0.2,
    },
  },
];
