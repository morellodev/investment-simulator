import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { Field, Input, Label } from "./Field";

const InitialInvestmentField: FC = () => {
  const initialInvestment = useInvestmentStore(
    (state) => state.initialInvestment
  );

  const setInitialInvestment = useInvestmentStore(
    (state) => state.setInitialInvestment
  );

  return (
    <Field>
      <Label>Initial Investment (&euro;)</Label>
      <Input
        type="text"
        inputMode="decimal"
        value={initialInvestment}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          setInitialInvestment(n);
        }}
      />
    </Field>
  );
};

const MonthlyContributionField: FC = () => {
  const monthlyContribution = useInvestmentStore(
    (state) => state.monthlyContribution
  );

  const setMonthlyContribution = useInvestmentStore(
    (state) => state.setMonthlyContribution
  );

  return (
    <Field>
      <Label>Monthly Contribution (&euro;)</Label>
      <Input
        type="text"
        inputMode="decimal"
        value={monthlyContribution}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          setMonthlyContribution(n);
        }}
      />
    </Field>
  );
};

const TimeHorizonField: FC = () => {
  const years = useInvestmentStore((state) => state.years);

  const setYears = useInvestmentStore((state) => state.setYears);

  return (
    <Field>
      <Label>Time Horizon (years)</Label>
      <Input
        type="text"
        inputMode="decimal"
        value={years}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          setYears(n);
        }}
      />
    </Field>
  );
};

export const InvestmentInputs: FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
      <InitialInvestmentField />
      <MonthlyContributionField />
      <TimeHorizonField />
    </div>
  );
};
