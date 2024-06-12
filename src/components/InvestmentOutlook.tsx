import {
  useFutureInvestmentValue,
  useTotalInvested,
} from "@/store/investmentStore";
import { FC } from "react";
import { Currency } from "./Currency";

const TotalInvested: FC = () => {
  const totalInvested = useTotalInvested();

  return (
    <div className="flex justify-between px-4 py-3 text-xl">
      <dt>Total Invested</dt>
      <dd className="font-semibold">
        <Currency value={totalInvested} />
      </dd>
    </div>
  );
};

const ProjectedValue: FC = () => {
  const futureInvestmentValue = useFutureInvestmentValue();

  return (
    <div className="flex justify-between px-4 py-3 text-xl rounded bg-primary text-primary-foreground">
      <dt>Projected Value</dt>
      <dd className="font-semibold">
        <Currency value={futureInvestmentValue} />
      </dd>
    </div>
  );
};

export const InvestmentOutlook: FC = () => {
  return (
    <dl className="flex flex-col">
      <TotalInvested />
      <ProjectedValue />
    </dl>
  );
};
