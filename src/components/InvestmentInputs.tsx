import { type FC, useId } from "react";
import { useShallow } from "zustand/shallow";
import {
  initialInvestmentRange,
  investmentDurationYearsRange,
  monthlyContributionRange,
} from "@/constants";
import { useAppStore } from "@/store/appStore";
import { clamp } from "@/utils/math";
import { CurrencySymbol } from "./CurrencySymbol";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const InitialInvestmentField: FC = () => {
  const id = useId();

  const { currency, initialInvestment, setInitialInvestment } = useAppStore(
    useShallow((state) => ({
      currency: state.currency,
      initialInvestment: state.initialInvestment,
      setInitialInvestment: state.setInitialInvestment,
    })),
  );

  return (
    <fieldset>
      <legend className="sr-only">Set initial investment</legend>
      <div className="mb-4 flex flex-col gap-3">
        <Label htmlFor={id}>
          Initial Investment (<CurrencySymbol currency={currency} />)
        </Label>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={initialInvestment}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isNaN(n)) return;
            setInitialInvestment(clamp(n, ...initialInvestmentRange));
          }}
        />
      </div>
      <Slider
        min={initialInvestmentRange[0]}
        max={initialInvestmentRange[1]}
        step={100}
        value={[initialInvestment]}
        onValueChange={([v]) => setInitialInvestment(v)}
      />
    </fieldset>
  );
};

const MonthlyContributionField: FC = () => {
  const id = useId();

  const { currency, monthlyContribution, setMonthlyContribution } = useAppStore(
    useShallow((state) => ({
      currency: state.currency,
      monthlyContribution: state.monthlyContribution,
      setMonthlyContribution: state.setMonthlyContribution,
    })),
  );

  return (
    <fieldset>
      <legend className="sr-only">Set monthly contribution</legend>
      <div className="mb-4 flex flex-col gap-3">
        <Label htmlFor={id}>
          Monthly Contribution (<CurrencySymbol currency={currency} />)
        </Label>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={monthlyContribution}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isNaN(n)) return;
            setMonthlyContribution(clamp(n, ...monthlyContributionRange));
          }}
        />
      </div>
      <Slider
        min={monthlyContributionRange[0]}
        max={monthlyContributionRange[1]}
        step={50}
        value={[monthlyContribution]}
        onValueChange={([v]) => setMonthlyContribution(v)}
      />
    </fieldset>
  );
};

const TimeHorizonField: FC = () => {
  const id = useId();

  const { years, setYears } = useAppStore(
    useShallow((state) => ({
      years: state.years,
      setYears: state.setYears,
    })),
  );

  return (
    <fieldset>
      <legend className="sr-only">Set time horizon</legend>
      <div className="mb-4 flex flex-col gap-3">
        <Label htmlFor={id}>Time Horizon (years)</Label>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={years}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isNaN(n)) return;
            setYears(clamp(n, ...investmentDurationYearsRange));
          }}
        />
      </div>
      <Slider
        min={investmentDurationYearsRange[0]}
        max={investmentDurationYearsRange[1]}
        value={[years]}
        onValueChange={([v]) => setYears(v)}
      />
    </fieldset>
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
