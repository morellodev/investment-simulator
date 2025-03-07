import {
  useInvestmentStore,
  useProjectionSeries,
} from "@/store/investmentStore";
import type { FC } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Currency } from "./Currency";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  value: {
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export const ProjectionChart: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);
  const locale = useInvestmentStore((state) => state.locale);
  const series = useProjectionSeries();

  const currentYear = new Date().getFullYear();

  const data = series.map((value, index) => ({
    year: currentYear + index + 1,
    value,
  }));

  return series.length === 0 ? (
    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
      Empty chart
    </div>
  ) : (
    <ChartContainer config={chartConfig} className="size-full">
      <BarChart data={data} margin={{ left: 0, right: 0 }}>
        <XAxis dataKey="year" tickLine={false} axisLine={false} />
        <YAxis
          dataKey="value"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            value.toLocaleString(locale, {
              style: "currency",
              currency,
              notation: "compact",
            })
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="min-w-0"
              formatter={(value, _, item) => (
                <div className="w-full">
                  <h3 className="font-light text-muted-foreground text-xs uppercase">
                    Year {item.payload.year}
                  </h3>
                  <p className="font-bold text-base">
                    <Currency value={value as number} />
                  </p>
                </div>
              )}
            />
          }
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default ProjectionChart;
