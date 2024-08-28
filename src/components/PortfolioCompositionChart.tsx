"use client";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { usePortfolio } from "@/store/investmentStore";
import type { FC } from "react";
import { Bar, ComposedChart, LabelList, XAxis, YAxis } from "recharts";

const chartConfig = {
  bonds: {
    label: "Bonds",
    color: "hsl(var(--secondary))",
  },
  stocks: {
    label: "Stocks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const PortfolioCompositionChart: FC = () => {
  const portfolio = usePortfolio();
  const chartData = [portfolio.composition];

  return (
    <ChartContainer config={chartConfig} className="size-full">
      {/* @ts-expect-error Type incompatibility between recharts and React 19 */}
      <ComposedChart
        barCategoryGap={0}
        data={chartData}
        layout="vertical"
        margin={{ left: 0, right: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis type="category" hide />
        <Bar
          dataKey="bonds"
          stackId="a"
          fill="var(--color-bonds)"
          radius={[4, 0, 0, 4]}
        >
          <LabelList
            className="fill-secondary-foreground"
            formatter={() => chartConfig.bonds.label}
          />
        </Bar>
        <Bar
          dataKey="stocks"
          stackId="a"
          fill="var(--color-stocks)"
          radius={[0, 4, 4, 0]}
        >
          <LabelList
            className="fill-primary-foreground"
            formatter={() => chartConfig.stocks.label}
          />
        </Bar>
      </ComposedChart>
    </ChartContainer>
  );
};

export default PortfolioCompositionChart;
