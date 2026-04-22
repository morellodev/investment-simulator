import type { StateCreator } from "zustand";

export type InvestmentSlice = {
  initialInvestment: number;
  monthlyContribution: number;
  annualInflation: number;
  years: number;
  setInitialInvestment: (initialInvestment: number) => void;
  setMonthlyContribution: (monthlyContribution: number) => void;
  setAnnualInflation: (annualInflation: number) => void;
  setYears: (years: number) => void;
};

export const createInvestmentSlice: StateCreator<InvestmentSlice> = (set) => ({
  // Initial state
  initialInvestment: 1000,
  monthlyContribution: 100,
  annualInflation: 0,
  years: 10,

  // Actions
  setInitialInvestment: (initialInvestment) => set({ initialInvestment }),
  setMonthlyContribution: (monthlyContribution) => set({ monthlyContribution }),
  setAnnualInflation: (annualInflation) => set({ annualInflation }),
  setYears: (years) => set({ years }),
});
