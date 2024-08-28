import { useInvestmentStore } from "@/store/investmentStore";
import { type FC, Suspense, lazy } from "react";
import { Card } from "./ui/card";

const PortfolioCompositionChartLazy = lazy(
  () => import("./PortfolioCompositionChart"),
);

export const PortfolioPreview: FC = () => {
  const description = useInvestmentStore(
    ({ portfolio }) => portfolio.description,
  );

  return (
    <Card className="px-4 py-3 shadow-inner">
      <div className="h-12">
        <Suspense
          fallback={
            <div className="relative size-full">
              <div className="absolute inset-x-0 rounded inset-y-1.5 border border-dashed" />
            </div>
          }
        >
          <PortfolioCompositionChartLazy />
        </Suspense>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};
