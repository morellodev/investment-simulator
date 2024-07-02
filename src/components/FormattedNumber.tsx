import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";

type Props = { value: number } & Intl.NumberFormatOptions;

export const FormattedNumber: FC<Props> = ({ value, ...options }) => {
  const locale = useInvestmentStore((state) => state.locale);

  return (
    <span className="tabular-nums">
      {value.toLocaleString(locale, options)}
    </span>
  );
};
