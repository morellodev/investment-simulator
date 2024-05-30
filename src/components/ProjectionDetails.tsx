import { FC } from "react";
import {
  useFutureInvestmentValue,
  useTotalInvested,
} from "../store/investmentStore";
import { Currency } from "./Currency";

export const ProjectionDetails: FC = () => {
  const totalInvested = useTotalInvested();
  const futureInvestmentValue = useFutureInvestmentValue();

  const yieldValue = futureInvestmentValue - totalInvested;
  const yieldRatio = yieldValue / totalInvested;
  const yieldPercent = yieldRatio.toLocaleString("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });

  return (
    <dl className="flex flex-col gap-2">
      <div className="flex justify-between px-4">
        <dt>Investment Return</dt>
        <dd className="font-semibold tabular-nums">
          {yieldRatio > 0 ? (
            <span className="text-green-600">{yieldPercent}</span>
          ) : (
            <span className="text-red-600">{yieldPercent}</span>
          )}
        </dd>
      </div>
      <div className="flex justify-between px-4">
        <dt>Total Earned</dt>
        <dd className="font-semibold">
          <Currency value={yieldValue} />
        </dd>
      </div>
    </dl>
  );
};
