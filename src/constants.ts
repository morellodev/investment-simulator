import type { Range } from "./types/range";

export const initialInvestmentRange: Range<number> = [0, 100_000];

export const monthlyContributionRange: Range<number> = [0, 5_000];

export const investmentDurationYearsRange: Range<number> = [0, 99];

export const annualInflationRange: Range<number> = [0, 8];
