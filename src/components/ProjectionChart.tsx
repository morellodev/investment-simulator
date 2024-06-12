import {
  useInvestmentStore,
  useProjectionSeries,
} from "@/store/investmentStore";
import { FC } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { Currency } from "./Currency";

export const ProjectionChart: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);
  const series = useProjectionSeries();

  const data = series.map((value, index) => [index + 1, value]);

  return series.length === 0 ? (
    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
      Empty chart
    </div>
  ) : (
    <ResponsiveContainer>
      {/* @ts-expect-error Type incompatibility between recharts and React 19 */}
      <BarChart data={data}>
        <XAxis
          dataKey="0"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="tabular-nums"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="tabular-nums"
          tickFormatter={(value: number) =>
            value.toLocaleString("en-US", {
              style: "currency",
              currency,
              notation: "compact",
            })
          }
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            fill: "hsl(var(--secondary))",
            // @ts-expect-error This is remapped by recharts
            radius: [4, 4, 0, 0],
          }}
        />
        <Bar
          dataKey="1"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip: FC<TooltipProps<number, string>> = ({
  active,
  label: year,
  payload,
}) => {
  if (!active || payload?.[0].value === undefined) return null;

  return (
    <div className="px-3 py-2 border rounded shadow text-card-foreground bg-card border-border">
      <h3 className="text-sm text-muted-foreground">Year {year}</h3>
      <p className="font-medium">
        <Currency value={payload[0].value} />
      </p>
    </div>
  );
};
