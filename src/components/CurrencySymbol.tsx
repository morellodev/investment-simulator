import { FC } from "react";
import { Currency } from "../data/currencies";

export const CurrencySymbol: FC<{ currency: Currency }> = ({ currency }) => {
  const currencyPart = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  })
    .formatToParts()
    .find((part) => part.type === "currency");

  return currencyPart ? currencyPart.value : null;
};
