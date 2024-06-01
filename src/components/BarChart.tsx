import { FC } from "react";
import { PHI } from "../utils/math";

type Props = {
  series: number[];
};

export const BarChart: FC<Props> = ({ series }) => {
  const barWidth = 100 / (series.length + (series.length - 1) / PHI);
  const barSpacing = barWidth / PHI;

  const highestValue = Math.max(...series);

  const coords: Array<[x: number, y: number]> = series.map((value, i) => [
    i * (barWidth + barSpacing),
    (100 * value) / highestValue,
  ]);

  return (
    <svg className="fill-current size-full">
      {coords.map(([x, y], i) => (
        <rect
          key={i}
          width={`${barWidth}%`}
          height={`${y}%`}
          x={`${x}%`}
          y={`${100 - y}%`}
        />
      ))}
    </svg>
  );
};
