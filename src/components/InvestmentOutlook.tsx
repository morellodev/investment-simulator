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
      <div className="flex justify-between px-4 pb-3 text-xl">
        <dt>Total Invested</dt>
        <dd className="font-semibold">
          <Currency value={totalInvested} />
        </dd>
      </div>
      <div className="flex justify-between px-4 py-3 text-xl text-white bg-black rounded">
        <dt>Projected Value</dt>
        <dd className="font-semibold">
          <Currency value={futureInvestmentValue} />
        </dd>
      </div>
    </dl>
  );
};
