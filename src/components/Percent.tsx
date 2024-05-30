import { FC } from "react";

export const Percent: FC<{ value: number }> = ({ value }) => {
  const formatted = value.toLocaleString("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  return <span className="tabular-nums">{formatted}</span>;
};
