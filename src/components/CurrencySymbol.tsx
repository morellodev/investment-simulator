import type { FC } from "react";
import type { Currency } from "@/data/currencies";
import { useAppStore } from "@/store/appStore";

export const CurrencySymbol: FC<{ currency: Currency }> = ({ currency }) => {
  const locale = useAppStore((state) => state.locale);

  const currencyPart = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  })
    .formatToParts()
    .find((part) => part.type === "currency");

  return currencyPart ? currencyPart.value : null;
};
