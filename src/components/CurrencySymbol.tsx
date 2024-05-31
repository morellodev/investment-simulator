import { FC } from "react";
import { match } from "ts-pattern";
import { Currency } from "../data/currencies";

export const CurrencySymbol: FC<{ currency: Currency }> = ({ currency }) => {
  return match(currency)
    .with("USD", () => <>&#x24;</>)
    .with("EUR", () => <>&#x20ac;</>)
    .with("GBP", () => <>&#xa3;</>)
    .exhaustive();
};
