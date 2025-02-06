import { usePortfolio } from "@/store/investmentStore";
import type { FC } from "react";
import { Percent } from "./Percent";

export const ReturnRate: FC = () => {
  const { annualReturn } = usePortfolio();

  return (
    <>
      <Percent value={annualReturn} /> estimated return
    </>
  );
};
