import { FC } from "react";
import { FormattedNumber } from "./FormattedNumber";

type Props = { value: number } & Omit<Intl.NumberFormatOptions, "style">;

export const Currency: FC<Props> = ({
  value,
  currency = "EUR",
  maximumFractionDigits = 0,
  ...rest
}) => {
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
