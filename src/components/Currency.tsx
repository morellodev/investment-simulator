import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";
import { FormattedNumber } from "./FormattedNumber";

type Props = { value: number } & Omit<
  Intl.NumberFormatOptions,
  "style" | "currency"
>;

export const Currency: FC<Props> = ({
  value,
  maximumFractionDigits = 0,
  ...rest
}) => {
  const currency = useInvestmentStore((state) => state.currency);

  return (
    <FormattedNumber
      value={value}
      style="currency"
      currency={currency}
      maximumFractionDigits={maximumFractionDigits}
      {...rest}
    />
  );
};
