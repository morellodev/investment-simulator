import { usePortfolio } from "@/store/investmentStore";
import { type FC, Suspense, lazy } from "react";
import { Card } from "./ui/card";

const PortfolioCompositionChartLazy = lazy(
  () => import("./PortfolioCompositionChart"),
);

export const PortfolioPreview: FC = () => {
  const { description } = usePortfolio();

  return (
    <Card className="px-4 pt-4 pb-3 shadow-inner">
      <div className="h-12">
        <Suspense
          fallback={<div className="border border-dashed rounded size-full" />}
        >
          <PortfolioCompositionChartLazy />
        </Suspense>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};
