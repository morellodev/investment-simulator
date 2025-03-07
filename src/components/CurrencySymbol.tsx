import type { Currency } from "@/data/currencies";
import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";

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
