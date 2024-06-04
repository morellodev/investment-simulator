import { FC } from "react";
import { useYieldRatio, useYieldValue } from "../store/investmentStore";
import { Currency } from "./Currency";
import { Percent } from "./Percent";

const InvestmentReturn: FC = () => {
  const yieldRatio = useYieldRatio();

  const normalizedYieldRatio = Number.isNaN(yieldRatio) ? 0 : yieldRatio;

  return (
    <div className="flex justify-between px-4">
      <dt>Investment Return</dt>
      <dd className="font-semibold">
        <span
          className={
            normalizedYieldRatio === 0
              ? "text-muted-foreground"
              : normalizedYieldRatio > 0
              ? "text-green-700"
              : "text-red-700"
          }
        >
          <Percent value={normalizedYieldRatio} signDisplay="exceptZero" />
        </span>
      </dd>
    </div>
  );
};

const TotalEarned: FC = () => {
  const yieldValue = useYieldValue();

  return (
    <div className="flex justify-between px-4">
      <dt>Total Earned</dt>
      <dd className="font-semibold">
        <Currency value={yieldValue} />
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
