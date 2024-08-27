import { useInvestmentStore } from "@/store/investmentStore";
import { type FC, Suspense, lazy } from "react";
import { Card, CardContent } from "./ui/card";

const PortfolioCompositionChartLazy = lazy(
  () => import("./PortfolioCompositionChart"),
);

export const PortfolioPreview: FC = () => {
  const portfolio = useInvestmentStore((state) => state.portfolio);

  return (
    <Card className="border-none bg-card-foreground">
      <CardContent className="px-4 py-3">
        <div className="h-14">
          <Suspense
            fallback={
              <div className="relative size-full">
                <div className="absolute inset-x-0 rounded inset-y-1.5 border border-dashed border-muted" />
              </div>
            }
          >
            <PortfolioCompositionChartLazy />
          </Suspense>
        </div>
        <p className="text-xs text-card mt-0.5">{portfolio.description}</p>
      </CardContent>
    </Card>
  );
};
