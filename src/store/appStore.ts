import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { type Portfolio, portfolios } from "@/data/portfolios";
import {
  calculateFutureInvestmentValue,
  calculateInvestmentMetrics,
} from "@/utils/finance";
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
    useShallow((state) =>
      Array.from({ length: state.years }, (_, i) =>
        calculateFutureInvestmentValue({
          years: i + 1,
          initialInvestment: state.initialInvestment,
          monthlyContribution: state.monthlyContribution,
          annualInflation: state.annualInflationCent / 100,
          annualReturn,
        }),
      ),
    ),
  );
};
