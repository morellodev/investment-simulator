import { FC } from "react";

type Props = { value: number } & Intl.NumberFormatOptions;

export const FormattedNumber: FC<Props> = ({ value, ...options }) => {
  const formatted = value.toLocaleString("en-US", options);

  return <span className="tabular-nums">{formatted}</span>;
};
