import type { Currency } from "@/data/currencies";
import type { Locale } from "@/data/locales";
import { type Portfolio, portfolios } from "@/data/portfolios";
import {
  calculateFutureInvestmentValue,
  calculateRateOfReturn,
  calculateReturnValue,
  calculateTotalInvested,
} from "@/utils/finance";
import { persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";

type State = {
  currency: Currency;
  locale: Locale;
  initialInvestment: number;
  monthlyContribution: number;
  annualInflationCent: number;
  years: number;
  portfolioId: (typeof portfolios)[number]["id"];
};

type Actions = {
  setCurrency: (currency: State["currency"]) => void;
  setLocale: (locale: State["locale"]) => void;
  setInitialInvestment: (initialInvestment: State["initialInvestment"]) => void;
  setMonthlyContribution: (
    monthlyContribution: State["monthlyContribution"],
  ) => void;
  setAnnualInflationCent: (
    annualInflationCent: State["annualInflationCent"],
  ) => void;
  setYears: (years: State["years"]) => void;
  setPortfolioId: (portfolio: State["portfolioId"]) => void;
};

const initialState: State = {
  currency: "EUR",
  locale: "en-US",
  initialInvestment: 1000,
  monthlyContribution: 100,
  annualInflationCent: 0,
  years: 10,
  portfolioId: "balanced",
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
        setAnnualInflationCent: (annualInflationCent) =>
          set({ annualInflationCent }),
        setYears: (years) => set({ years }),
        setPortfolioId: (portfolioId) => set({ portfolioId }),
      };
    },
    {
      name: "investment-store",
    },
  ),
);

export const usePortfolio = () => {
  const portfolioId = useInvestmentStore((state) => state.portfolioId);

  return portfolios.find(
    (portfolio) => portfolio.id === portfolioId,
  ) as Portfolio;
};

export const useTotalInvested = () =>
  useInvestmentStore(calculateTotalInvested);

export const useFutureInvestmentValue = () =>
  useInvestmentStore(
    ({
      annualInflationCent,
      initialInvestment,
      monthlyContribution,
      years,
    }) => {
      const { annualReturn } = usePortfolio();

      return calculateFutureInvestmentValue({
        initialInvestment,
        monthlyContribution,
        years,
        annualReturn,
        annualInflation: annualInflationCent / 100,
      });
    },
  );

export const useReturnValue = () =>
  useInvestmentStore((state) => {
    const { annualReturn } = usePortfolio();

    return calculateReturnValue({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue({
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        years: state.years,
        annualInflation: state.annualInflationCent / 100,
        annualReturn,
      }),
    });
  });

export const useRateOfReturn = () =>
  useInvestmentStore((state) => {
    const { annualReturn } = usePortfolio();

    return calculateRateOfReturn({
      totalInvested: calculateTotalInvested(state),
      futureInvestmentValue: calculateFutureInvestmentValue({
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        years: state.years,
        annualInflation: state.annualInflationCent / 100,
        annualReturn,
      }),
    });
  });

export const useProjectionSeries = () =>
  useInvestmentStore((state) => {
    const { annualReturn } = usePortfolio();

    return Array.from({ length: state.years }, (_, i) =>
      calculateFutureInvestmentValue({
        years: i + 1,
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        annualInflation: state.annualInflationCent / 100,
        annualReturn,
      }),
    );
  });
