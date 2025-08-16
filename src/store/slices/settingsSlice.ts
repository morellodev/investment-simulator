import type { StateCreator } from "zustand";
import type { Currency } from "@/data/currencies";
import type { Locale } from "@/data/locales";
import type { Portfolio } from "@/data/portfolios";

export type SettingsSlice = {
  currency: Currency;
  locale: Locale;
  portfolioId: Portfolio["id"];
  setCurrency: (currency: Currency) => void;
  setLocale: (locale: Locale) => void;
  setPortfolioId: (portfolioId: Portfolio["id"]) => void;
};

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  // Initial state
  currency: "EUR",
  locale: "en-US",
  portfolioId: "balanced",

  // Actions
  setCurrency: (currency) => set({ currency }),
  setLocale: (locale) => set({ locale }),
  setPortfolioId: (portfolioId) => set({ portfolioId }),
});
