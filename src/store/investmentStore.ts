import type { Currency } from "@/data/currencies";
import type { Locale } from "@/data/locales";
import {
  calculateFutureInvestmentValue,
  calculateRateOfReturn,
  calculateReturnValue,
  calculateTotalInvested,
} from "@/utils/finance";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  currency: Currency;
  locale: Locale;
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  interestRate: number;
};

type Actions = {
  setCurrency: (currency: State["currency"]) => void;
  setLocale: (locale: State["locale"]) => void;
  setInitialInvestment: (initialInvestment: State["initialInvestment"]) => void;
  setMonthlyContribution: (
    monthlyContribution: State["monthlyContribution"],
  ) => void;
  setYears: (years: State["years"]) => void;
  setInterestRate: (interestRate: number) => void;
};

const initialState: State = {
  currency: "EUR",
  locale: "en-US",
  initialInvestment: 1000,
  monthlyContribution: 100,
  years: 10,
  interestRate: 0.075,
};

type InvestmentStore = State & Actions;

export const useInvestmentStore = create<InvestmentStore>()(
  persist(
    (set) => {
      return {
        ...initialState,
        setCurrency: (currency) => set({ currency }),
        setLocale: (locale) => set({ locale }),
        setInitialInvestment: (initialInvestment) => set({ initialInvestment }),
        setMonthlyContribution: (monthlyContribution) =>
          set({ monthlyContribution }),
        setYears: (years) => set({ years }),
        setInterestRate: (interestRate) => set({ interestRate }),
      };
    },
    {
      name: "investment-store",
    },
  ),
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
    }),
  );

export const useRateOfReturn = () =>
  useInvestmentStore((state) =>
    calculateRateOfReturn({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue(state),
    }),
  );

export const useProjectionSeries = () =>
  useInvestmentStore((state) =>
    Array.from({ length: state.years }, (_, i) =>
      calculateFutureInvestmentValue({
        years: i + 1,
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        interestRate: state.interestRate,
      }),
    ),
  );
