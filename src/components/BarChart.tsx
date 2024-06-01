import { FC } from "react";
import { useDimensions } from "../hooks/useDimensions";

type Props = {
  series: number[];
};

export const BarChart: FC<Props> = ({ series }) => {
  const [chartRef, [chartWidth, chartHeight]] = useDimensions<SVGSVGElement>();

  // Chart width = W
  // Number of bars = N
  // Number of spaces between bars = N - 1

  // If each bar has same width and same spacing, then
  // the width of each bar is W / (N + N - 1) = W / (2N - 1)

  // If the ratio of bar width to spacing is R = 1 / φ (Golden ratio)
  const barWidthToSpacingRatio = 0.6180339887;

  // The width of each bar is W / (N + R * (N - 1))
  const barWidth =
    chartWidth / (series.length + barWidthToSpacingRatio * (series.length - 1));

  // The width of each space is R * W / (N + R * (N - 1))
  const barSpacing = barWidthToSpacingRatio * barWidth;

  const highestValue = Math.max(...series);

  const coords: Array<[x: number, y: number]> = series.map((value, i) => [
    // The x-coordinate of the i-th bar is i * (W / (N + R * (N - 1)) + R * W / (N + R * (N - 1)))
    i * (barWidth + barSpacing),
    (chartHeight * value) / highestValue,
  ]);

  return (
    <svg ref={chartRef} className="fill-current size-full">
      {coords.map(([x, y], i) => (
        <rect key={i} width={barWidth} height={y} x={x} y={chartHeight - y} />
      ))}
    </svg>
  );
};
