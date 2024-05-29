import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";

export const ReturnRate: FC = () => {
  const interestRate = useInvestmentStore((state) => state.interestRate);

  const percent = interestRate.toLocaleString("en-US", {
    style: "percent",
    maximumSignificantDigits: 2,
  });

  return (
    <span className="text-sm tabular-nums text-zinc-600">{`${percent} estimated return`}</span>
  );
};
