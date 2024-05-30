import { FC } from "react";

export const Currency: FC<{ value: number }> = ({ value }) => {
  const formatted = value.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return <span className="tabular-nums">{formatted}</span>;
};
