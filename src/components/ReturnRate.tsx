import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { Percent } from "./Percent";

export const ReturnRate: FC = () => {
  const interestRate = useInvestmentStore((state) => state.interestRate);

  return (
    <>
      <Percent value={interestRate} /> estimated return
    </>
  );
};
