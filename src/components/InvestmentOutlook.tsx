import { FC } from "react";
import {
  useFutureInvestmentValue,
  useTotalInvested,
} from "../store/investmentStore";
import { Currency } from "./Currency";

export const InvestmentOutlook: FC = () => {
  const totalInvested = useTotalInvested();
  const futureInvestmentValue = useFutureInvestmentValue();

  return (
    <dl className="flex flex-col">
      <div className="flex justify-between text-xl px-4 pb-3">
        <dt>Total Invested</dt>
        <dd className="font-semibold tabular-nums">
          <Currency value={totalInvested} />
        </dd>
      </div>
      <div className="flex justify-between text-xl px-4 py-3 bg-black rounded text-white">
        <dt>Projected Value</dt>
        <dd className="font-semibold tabular-nums">
          <Currency value={futureInvestmentValue} />
        </dd>
      </div>
    </dl>
  );
};
