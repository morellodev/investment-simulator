import { FC } from "react";
import {
  useFutureInvestmentValue,
  useTotalInvested,
} from "../store/investmentStore";
import { Currency } from "./Currency";
import { Percent } from "./Percent";

export const ProjectionDetails: FC = () => {
  const totalInvested = useTotalInvested();
  const futureInvestmentValue = useFutureInvestmentValue();

  const yieldValue = futureInvestmentValue - totalInvested;
  const yieldRatio = yieldValue / totalInvested;

  return (
    <dl className="flex flex-col gap-2">
      <div className="flex justify-between px-4">
        <dt>Investment Return</dt>
        <dd className="font-semibold">
          <span className={yieldRatio >= 0 ? "text-green-600" : "text-red-600"}>
            <Percent value={yieldRatio} signDisplay="exceptZero" />
          </span>
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
