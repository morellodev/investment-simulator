import type { FC } from "react";
import type { Currency } from "@/data/currencies";
import { useInvestmentStore } from "@/store/investmentStore";

export const CurrencySymbol: FC<{ currency: Currency }> = ({ currency }) => {
  const locale = useInvestmentStore((state) => state.locale);

  const currencyPart = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  })
    .formatToParts()
    .find((part) => part.type === "currency");

  return currencyPart ? currencyPart.value : null;
};
