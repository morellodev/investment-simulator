import type { FC } from "react";
import { useAppStore } from "@/store/appStore";
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
  const currency = useAppStore((state) => state.currency);

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
