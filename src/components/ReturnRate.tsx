import { usePortfolio } from "@/store/investmentStore";
import type { FC } from "react";
import { Percent } from "./Percent";

export const ReturnRate: FC = () => {
  const { yoyReturn } = usePortfolio();

  return (
    <>
      <Percent value={yoyReturn} /> estimated return
    </>
  );
};
