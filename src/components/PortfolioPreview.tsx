import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";
import { PortfolioCompositionChart } from "./PortfolioCompositionChart";

export const PortfolioPreview: FC = () => {
  const portfolio = useInvestmentStore((state) => state.portfolio);

  return (
    <div className="space-y-0.5">
      <div className="h-14">
        <PortfolioCompositionChart />
      </div>
      <p className="text-xs text-muted-foreground">{portfolio.description}</p>
    </div>
  );
};
