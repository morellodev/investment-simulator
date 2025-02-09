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
      <div className="h-8 md:h-10">
        <Suspense
          fallback={<div className="size-full rounded border border-dashed" />}
        >
          <PortfolioCompositionChartLazy />
        </Suspense>
      </div>
      <p className="mt-2 text-muted-foreground text-xs">{description}</p>
    </Card>
  );
};
