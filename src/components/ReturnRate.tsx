import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";

export const ReturnRate: FC = () => {
  const interestRate = useInvestmentStore((state) => state.interestRate);

  const percent = interestRate.toLocaleString("en-US", {
    style: "percent",
    maximumSignificantDigits: 2,
  });

  return (
    <span className="text-sm text-zinc-600">
      <span className="tabular-nums">{percent}</span> estimated return
    </span>
  );
};
