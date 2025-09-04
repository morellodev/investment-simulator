import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { type Portfolio, portfolios } from "@/data/portfolios";
import { calculateInvestmentMetrics } from "@/utils/finance";
import {
  createInvestmentSlice,
  type InvestmentSlice,
} from "./slices/investmentSlice";
import {
  createSettingsSlice,
  type SettingsSlice,
} from "./slices/settingsSlice";

type AppStore = SettingsSlice & InvestmentSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...args) => ({
      ...createSettingsSlice(...args),
      ...createInvestmentSlice(...args),
    }),
    {
      name: "investment-simulator-state",
    },
  ),
);

export const usePortfolio = () => {
  return useAppStore((state) => {
    return portfolios.find(
      (portfolio) => portfolio.id === state.portfolioId,
    ) as Portfolio;
  });
};

export const useInvestmentMetrics = () => {
  const { annualReturn } = usePortfolio();

  return useAppStore(
    useShallow((state) =>
      calculateInvestmentMetrics({
        initialInvestment: state.initialInvestment,
        monthlyContribution: state.monthlyContribution,
        years: state.years,
        annualInflation: state.annualInflationCent / 100,
        annualReturn,
      }),
    ),
  );
};

export const useProjectionSeries = () => {
  const { annualReturn } = usePortfolio();

  return useAppStore(
    useShallow((state) => {
      const {
        initialInvestment,
        monthlyContribution,
        years,
        annualInflationCent,
      } = state;
      const annualInflation = annualInflationCent / 100;

      const realAnnualReturn = (1 + annualReturn) / (1 + annualInflation) - 1;
      const monthlyRealReturn = realAnnualReturn / 12;

      const series = [];
      let currentValue = initialInvestment;

      for (let year = 1; year <= years; year++) {
        for (let month = 0; month < 12; month++) {
          currentValue =
            currentValue * (1 + monthlyRealReturn) + monthlyContribution;
        }
        series.push(currentValue);
      }

      return series;
    }),
  );
};
