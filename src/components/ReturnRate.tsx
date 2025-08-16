import type { FC } from "react";
import { usePortfolio } from "@/store/appStore";
import { Percent } from "./Percent";

export const ReturnRate: FC = () => {
  const { annualReturn } = usePortfolio();

  return (
    <>
      <Percent value={annualReturn} /> estimated return
    </>
  );
};
