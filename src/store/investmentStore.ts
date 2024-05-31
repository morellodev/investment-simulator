import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Currency } from "../data/currencies";
import {
  calculateFutureInvestmentValue,
  calculateTotalInvested,
  calculateYieldRatio,
  calculateYieldValue,
} from "../utils/math";

type State = {
  currency: Currency;
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  interestRate: number;
};

type Actions = {
  setCurrency: (currency: State["currency"]) => void;
  setInitialInvestment: (initialInvestment: State["initialInvestment"]) => void;
  setMonthlyContribution: (
    monthlyContribution: State["monthlyContribution"]
  ) => void;
  setYears: (years: State["years"]) => void;
  setInterestRate: (interestRate: number) => void;
};

const initialState: State = {
  currency: "EUR",
  initialInvestment: 1000,
  monthlyContribution: 100,
  years: 10,
  interestRate: 0.075,
};

export const useInvestmentStore = create<State & Actions>()(
  persist(
    (set) => {
      return {
        ...initialState,
        setCurrency: (currency) => set({ currency }),
        setInitialInvestment: (initialInvestment) => set({ initialInvestment }),
        setMonthlyContribution: (monthlyContribution) =>
          set({ monthlyContribution }),
        setYears: (years) => set({ years }),
        setInterestRate: (interestRate) => set({ interestRate }),
      };
    },
    {
      name: "investment-store",
    }
  )
);

export const useTotalInvested = () =>
  useInvestmentStore(calculateTotalInvested);

export const useFutureInvestmentValue = () =>
  useInvestmentStore(calculateFutureInvestmentValue);

export const useYieldValue = () =>
  useInvestmentStore((state) =>
    calculateYieldValue({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue(state),
    })
  );

export const useYieldRatio = () =>
  useInvestmentStore((state) =>
    calculateYieldRatio({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue(state),
    })
  );
