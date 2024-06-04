import { FC } from "react";
import { PHI } from "../utils/math";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Currency } from "./Currency";

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
    <svg className="fill-primary size-full">
      {coords.map(([x, y], i) => (
        <TooltipPrimitive.Root key={i} delayDuration={0}>
          <TooltipPrimitive.Trigger asChild>
            <rect
              width={`${barWidth}%`}
              height={`${y}%`}
              x={`${x}%`}
              y={`${100 - y}%`}
            />
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              sideOffset={5}
              className="px-1.5 py-1 md:px-3 md:py-2 font-medium bg-background rounded shadow"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground md:text-md">
                  Year {i + 1}
                </span>
                <span className="text-md text-foreground md:text-base">
                  <Currency value={series[i]} />
                </span>
              </div>
              <TooltipPrimitive.Arrow className="fill-background" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      ))}
    </svg>
  );
};
