import type { FC } from "react";
import { useInvestmentMetrics } from "@/store/appStore";
import { Currency } from "./Currency";
import { Percent } from "./Percent";

const InvestmentReturn: FC = () => {
  const { rateOfReturn } = useInvestmentMetrics();

  const normalizedReturnRate = Number.isNaN(rateOfReturn) ? 0 : rateOfReturn;

  return (
    <div className="flex justify-between px-4">
      <dt>Investment Return</dt>
      <dd className="font-semibold">
        <span
          className={
            normalizedReturnRate === 0
              ? "text-muted-foreground"
              : normalizedReturnRate > 0
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
          }
        >
          <Percent value={normalizedReturnRate} signDisplay="exceptZero" />
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
      <InvestmentReturn />
      <TotalEarned />
    </dl>
  );
};
