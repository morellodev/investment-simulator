import type { FC } from "react";
import { FormattedNumber } from "./FormattedNumber";

type Props = { value: number } & Omit<Intl.NumberFormatOptions, "style">;

export const Percent: FC<Props> = ({
  value,
  maximumFractionDigits = 1,
  ...rest
}) => {
  return (
    <FormattedNumber
      style="percent"
      value={value}
      maximumFractionDigits={maximumFractionDigits}
      {...rest}
    />
  );
};
