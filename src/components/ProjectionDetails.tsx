import { FC } from "react";
import { useYieldRatio, useYieldValue } from "../store/investmentStore";
import { Currency } from "./Currency";
import { Percent } from "./Percent";

const InvestmentReturn: FC = () => {
  const yieldRatio = useYieldRatio();

  return (
    <div className="flex justify-between px-4">
      <dt>Investment Return</dt>
      <dd className="font-semibold">
        <span className={yieldRatio >= 0 ? "text-green-600" : "text-red-600"}>
          <Percent value={yieldRatio} signDisplay="exceptZero" />
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
