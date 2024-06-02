import { FC } from "react";
import {
  MAX_INITIAL_INVESTMENT,
  MAX_MONTHLY_CONTRIBUTION,
  MAX_YEARS,
  MIN_INITIAL_INVESTMENT,
  MIN_MONTHLY_CONTRIBUTION,
  MIN_YEARS,
} from "../constants";
import { useInvestmentStore } from "../store/investmentStore";
import { clamp } from "../utils/math";
import { CurrencySymbol } from "./CurrencySymbol";
import { Field, Input, Label } from "./Field";
import { Slider } from "./Slider";

const InitialInvestmentField: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);

  const initialInvestment = useInvestmentStore(
    (state) => state.initialInvestment
  );

  const setInitialInvestment = useInvestmentStore(
    (state) => state.setInitialInvestment
  );

  return (
    <Field>
      <Label>
        Initial Investment (<CurrencySymbol currency={currency} />)
      </Label>
      <Input
        type="text"
        inputMode="decimal"
        value={initialInvestment}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          setInitialInvestment(
            clamp(n, MIN_INITIAL_INVESTMENT, MAX_INITIAL_INVESTMENT)
          );
        }}
      />
      <Slider
        min={MIN_INITIAL_INVESTMENT}
        max={MAX_INITIAL_INVESTMENT}
        step={100}
        value={initialInvestment}
        onChange={setInitialInvestment}
      />
    </Field>
  );
};

const MonthlyContributionField: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);

  const monthlyContribution = useInvestmentStore(
    (state) => state.monthlyContribution
  );

  const setMonthlyContribution = useInvestmentStore(
    (state) => state.setMonthlyContribution
  );

  return (
    <Field>
      <Label>
        Monthly Contribution (<CurrencySymbol currency={currency} />)
      </Label>
      <Input
        type="text"
        inputMode="decimal"
        value={monthlyContribution}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          setMonthlyContribution(
            clamp(n, MIN_MONTHLY_CONTRIBUTION, MAX_MONTHLY_CONTRIBUTION)
          );
        }}
      />
      <Slider
        min={MIN_MONTHLY_CONTRIBUTION}
        max={MAX_MONTHLY_CONTRIBUTION}
        step={50}
        value={monthlyContribution}
        onChange={setMonthlyContribution}
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
          setYears(clamp(n, MIN_YEARS, MAX_YEARS));
        }}
      />
      <Slider
        min={MIN_YEARS}
        max={MAX_YEARS}
        value={years}
        onChange={setYears}
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
