import type { FC } from "react";
import { useInvestmentMetrics } from "@/store/appStore";
import { Currency } from "./Currency";
import { Percent } from "./Percent";

const TotalReturn: FC = () => {
  const { totalReturn } = useInvestmentMetrics();

  const normalizedTotalReturn = Number.isNaN(totalReturn) ? 0 : totalReturn;

  return (
    <div className="flex justify-between px-4">
      <dt>Total Return</dt>
      <dd className="font-semibold">
        <span
          className={
            normalizedTotalReturn === 0
              ? "text-muted-foreground"
              : normalizedTotalReturn > 0
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
          }
        >
          <Percent value={normalizedTotalReturn} signDisplay="exceptZero" />
        </span>
      </dd>
    </div>
  );
};

const TotalEarned: FC = () => {
  const { returnValue } = useInvestmentMetrics();

  return (
    <div className="flex justify-between px-4">
      <dt>Total Earned</dt>
      <dd className="font-semibold">
        <Currency value={returnValue} />
      </dd>
    </div>
  );
};

export const ProjectionDetails: FC = () => {
  return (
    <dl className="flex flex-col gap-2">
      <TotalReturn />
      <TotalEarned />
    </dl>
  );
};
