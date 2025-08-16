import type { FC } from "react";
import { useAppStore } from "@/store/appStore";

type Props = { value: number } & Intl.NumberFormatOptions;

export const FormattedNumber: FC<Props> = ({ value, ...options }) => {
  const locale = useAppStore((state) => state.locale);

  return (
    <span className="tabular-nums">
      {value.toLocaleString(locale, options)}
    </span>
  );
};
