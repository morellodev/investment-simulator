import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  calculateFutureInvestmentValue,
  calculateTotalInvested,
  calculateYieldRatio,
  calculateYieldValue,
} from "../utils/math";

type State = {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  interestRate: number;
};

type Actions = {
  setInitialInvestment: (initialInvestment: number) => void;
  setMonthlyContribution: (monthlyContribution: number) => void;
  setYears: (years: number) => void;
  setInterestRate: (interestRate: number) => void;
};

const initialState: State = {
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
