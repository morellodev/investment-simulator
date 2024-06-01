import { FC } from "react";
import { useMeasure } from "../hooks/useMeasure";
import { PHI_INVERSE } from "../utils/math";

type Props = {
  series: number[];
};

export const BarChart: FC<Props> = ({ series }) => {
  const [chartRef, [chartWidth, chartHeight]] = useMeasure<SVGSVGElement>();

  // Chart width = W
  // Number of bars = N
  // Number of spaces between bars = N - 1

  // If each bar has same width and same spacing, then
  // the width of each bar is W / (N + N - 1) = W / (2N - 1)

  // If the ratio of bar width to spacing is R = φ (Golden ratio)
  const barWidthToSpacingRatio = PHI_INVERSE;

  // The width of each bar is W / (N + R * (N - 1))
  const barWidth =
    chartWidth / (series.length + barWidthToSpacingRatio * (series.length - 1));

  // The width of each space is R * W / (N + R * (N - 1))
  const barSpacing = barWidthToSpacingRatio * barWidth;

  const highestValue = Math.max(...series);

  const coords: Array<[x: number, y: number]> = series.map((value, i) => [
    // The x-coordinate of the i-th bar is i * (barWidth + barSpacing)
    i * (barWidth + barSpacing),
    // Scale the y-coordinate of the i-th bar to the chart height
    (chartHeight * value) / highestValue,
  ]);

  return (
    <svg
      ref={chartRef}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      className="fill-current size-full"
    >
      {coords.map(([x, y], i) => (
        <rect key={i} width={barWidth} height={y} x={x} y={chartHeight - y} />
      ))}
    </svg>
  );
};
