import { FC } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  useInvestmentStore,
  useProjectionSeries,
} from "../store/investmentStore";

export const ProjectionChart: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);
  const series = useProjectionSeries();

  const data = series.map((value, index) => [index + 1, value]);

  return (
    <div className="h-48 md:h-64 lg:h-80">
      {series.length === 0 ? (
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
            <Bar
              dataKey="1"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
