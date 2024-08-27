"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";
import { Bar, ComposedChart, LabelList, XAxis, YAxis } from "recharts";
import { Percent } from "./Percent";

const chartConfig = {
  bonds: {
    label: "Bonds",
    color: "hsl(var(--chart-2))",
  },
  stocks: {
    label: "Stocks",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const PortfolioCompositionChart: FC = () => {
  const chartData = useInvestmentStore((state) => [
    state.portfolio.composition,
  ]);

  return (
    <ChartContainer config={chartConfig} className="size-full">
      {/* @ts-expect-error Type incompatibility between recharts and React 19 */}
      <ComposedChart
        layout="vertical"
        data={chartData}
        margin={{ left: 0, right: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis type="category" hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="flex items-center w-full">
                  <div
                    className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg] mr-1.5"
                    style={
                      {
                        "--color-bg": `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    <Percent value={value as number} />
                  </div>
                </div>
              )}
            />
          }
        />
        <Bar
          dataKey="bonds"
          stackId="a"
          fill="var(--color-bonds)"
          radius={[4, 0, 0, 4]}
        >
          <LabelList className="fill-background" formatter={() => "Bonds"} />
        </Bar>
        <Bar
          dataKey="stocks"
          stackId="a"
          fill="var(--color-stocks)"
          radius={[0, 4, 4, 0]}
        >
          <LabelList className="fill-background" formatter={() => "Stocks"} />
        </Bar>
      </ComposedChart>
    </ChartContainer>
  );
};

export default PortfolioCompositionChart;
