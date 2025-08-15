import type { FC } from "react";
import { usePortfolio } from "@/store/investmentStore";
import { Percent } from "./Percent";

export const ReturnRate: FC = () => {
  const { annualReturn } = usePortfolio();

  return (
    <>
      <Percent value={annualReturn} /> estimated return
    </>
  );
};
