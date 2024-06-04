import { FC } from "react";
import { useForm } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

const InitialInvestmentField: FC = () => {
  const currency = useInvestmentStore((state) => state.currency);

  const initialInvestment = useInvestmentStore(
    (state) => state.initialInvestment
  );

  const setInitialInvestment = useInvestmentStore(
    (state) => state.setInitialInvestment
  );

  return (
    <div role="group" className="space-y-4">
      <FormField
        name="initialInvestment"
        render={() => (
          <FormItem>
            <FormLabel>
              Initial Investment (<CurrencySymbol currency={currency} />)
            </FormLabel>
            <FormControl>
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
            </FormControl>
          </FormItem>
        )}
      />
      <Slider
        min={MIN_INITIAL_INVESTMENT}
        max={MAX_INITIAL_INVESTMENT}
        step={100}
        value={[initialInvestment]}
        onValueChange={([v]) => setInitialInvestment(v)}
      />
    </div>
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
    <div role="group" className="space-y-4">
      <FormField
        name="monthlyContribution"
        render={() => (
          <FormItem>
            <FormLabel>
              Monthly Contribution (<CurrencySymbol currency={currency} />)
            </FormLabel>
            <FormControl>
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
            </FormControl>
          </FormItem>
        )}
      />
      <Slider
        min={MIN_MONTHLY_CONTRIBUTION}
        max={MAX_MONTHLY_CONTRIBUTION}
        step={50}
        value={[monthlyContribution]}
        onValueChange={([v]) => setMonthlyContribution(v)}
      />
    </div>
  );
};

const TimeHorizonField: FC = () => {
  const years = useInvestmentStore((state) => state.years);

  const setYears = useInvestmentStore((state) => state.setYears);

  return (
    <div role="group" className="space-y-4">
      <FormField
        name="years"
        render={() => (
          <FormItem>
            <FormLabel>Time Horizon (years)</FormLabel>
            <FormControl>
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
            </FormControl>
          </FormItem>
        )}
      />
      <Slider
        min={MIN_YEARS}
        max={MAX_YEARS}
        value={[years]}
        onValueChange={([v]) => setYears(v)}
      />
    </div>
  );
};

export const InvestmentInputs: FC = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="grid gap-4 md:grid-cols-3 lg:gap-8">
        <InitialInvestmentField />
        <MonthlyContributionField />
        <TimeHorizonField />
      </form>
    </Form>
  );
};
