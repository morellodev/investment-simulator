import { Currency } from "@/data/currencies";
import {
  calculateFutureInvestmentValue,
  calculateRateOfReturn,
  calculateReturnValue,
  calculateTotalInvested,
} from "@/utils/math";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useReturnValue = () =>
  useInvestmentStore((state) =>
    calculateReturnValue({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue(state),
    })
  );

export const useRateOfReturn = () =>
  useInvestmentStore((state) =>
    calculateRateOfReturn({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue(state),
    })
  );

export const useProjectionSeries = () =>
  useInvestmentStore((state) =>
    Array.from({ length: state.years }, (_, i) =>
      calculateFutureInvestmentValue({
        years: i + 1,
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        interestRate: state.interestRate,
      })
    )
  );
