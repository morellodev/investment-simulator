import { type FC, lazy, Suspense } from "react";
import { usePortfolio } from "@/store/appStore";
import { Card } from "./ui/card";

const PortfolioCompositionChartLazy = lazy(
  () => import("./PortfolioCompositionChart"),
);

export const PortfolioPreview: FC = () => {
  const { description } = usePortfolio();

  return (
    <Card className="inset-shadow-sm gap-2 px-4 pt-4 pb-3 shadow-none">
      <div className="h-8 md:h-10">
        <Suspense
          fallback={<div className="size-full rounded border border-dashed" />}
        >
          <PortfolioCompositionChartLazy />
        </Suspense>
      </div>
      <p className="text-muted-foreground text-xs">{description}</p>
    </Card>
  );
};
