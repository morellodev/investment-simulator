import type { StateCreator } from "zustand";

export type InvestmentSlice = {
  initialInvestment: number;
  monthlyContribution: number;
  annualInflationCent: number;
  years: number;
  setInitialInvestment: (initialInvestment: number) => void;
  setMonthlyContribution: (monthlyContribution: number) => void;
  setAnnualInflationCent: (annualInflationCent: number) => void;
  setYears: (years: number) => void;
};

export const createInvestmentSlice: StateCreator<InvestmentSlice> = (set) => ({
  // Initial state
  initialInvestment: 1000,
  monthlyContribution: 100,
  annualInflationCent: 0,
  years: 10,

  // Actions
  setInitialInvestment: (initialInvestment) => set({ initialInvestment }),
  setMonthlyContribution: (monthlyContribution) => set({ monthlyContribution }),
  setAnnualInflationCent: (annualInflationCent) => set({ annualInflationCent }),
  setYears: (years) => set({ years }),
});
