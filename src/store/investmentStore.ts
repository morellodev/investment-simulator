import type { Currency } from "@/data/currencies";
import type { Locale } from "@/data/locales";
import { type Portfolio, portfolios } from "@/data/portfolios";
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
  portfolio: Portfolio;
};

type Actions = {
  setCurrency: (currency: State["currency"]) => void;
  setLocale: (locale: State["locale"]) => void;
  setInitialInvestment: (initialInvestment: State["initialInvestment"]) => void;
  setMonthlyContribution: (
    monthlyContribution: State["monthlyContribution"],
  ) => void;
  setYears: (years: State["years"]) => void;
  setPortfolio: (portfolio: State["portfolio"]) => void;
};

const initialState: State = {
  currency: "EUR",
  locale: "en-US",
  initialInvestment: 1000,
  monthlyContribution: 100,
  years: 10,
  portfolio: portfolios[1],
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
        setPortfolio: (portfolio) => set({ portfolio }),
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
  useInvestmentStore(
    ({ initialInvestment, monthlyContribution, portfolio, years }) =>
      calculateFutureInvestmentValue({
        initialInvestment,
        monthlyContribution,
        years,
        interestRate: portfolio.yoyReturn,
      }),
  );

export const useReturnValue = () =>
  useInvestmentStore((state) =>
    calculateReturnValue({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue({
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        years: state.years,
        interestRate: state.portfolio.yoyReturn,
      }),
    }),
  );

export const useRateOfReturn = () =>
  useInvestmentStore((state) =>
    calculateRateOfReturn({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue({
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        years: state.years,
        interestRate: state.portfolio.yoyReturn,
      }),
    }),
  );

export const useProjectionSeries = () =>
  useInvestmentStore((state) =>
    Array.from({ length: state.years }, (_, i) =>
      calculateFutureInvestmentValue({
        years: i + 1,
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        interestRate: state.portfolio.yoyReturn,
      }),
    ),
  );
