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
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
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
    <Field>
      <div className="mb-2 flex flex-col gap-3">
        <FieldLabel htmlFor={id}>Initial Investment</FieldLabel>
        <InputGroup>
          <InputGroupInput
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
          <InputGroupAddon>
            <CurrencySymbol currency={currency} />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Slider
        min={initialInvestmentRange[0]}
        max={initialInvestmentRange[1]}
        step={100}
        value={[initialInvestment]}
        onValueChange={([v]) => setInitialInvestment(v)}
      />
    </Field>
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
    <Field>
      <div className="mb-2 flex flex-col gap-3">
        <FieldLabel htmlFor={id}>Monthly Contribution</FieldLabel>
        <InputGroup>
          <InputGroupInput
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
          <InputGroupAddon>
            <CurrencySymbol currency={currency} />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Slider
        min={monthlyContributionRange[0]}
        max={monthlyContributionRange[1]}
        step={50}
        value={[monthlyContribution]}
        onValueChange={([v]) => setMonthlyContribution(v)}
      />
    </Field>
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
    <Field>
      <div className="mb-2 flex flex-col gap-3">
        <FieldLabel htmlFor={id}>Time Horizon</FieldLabel>
        <InputGroup>
          <InputGroupInput
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
          <InputGroupAddon align="inline-end">
            <InputGroupText>years</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Slider
        min={investmentDurationYearsRange[0]}
        max={investmentDurationYearsRange[1]}
        value={[years]}
        onValueChange={([v]) => setYears(v)}
      />
    </Field>
  );
};

export const InvestmentInputs: FC = () => {
  return (
    <FieldGroup className="grid gap-4 md:grid-cols-3 lg:gap-8">
      <InitialInvestmentField />
      <MonthlyContributionField />
      <TimeHorizonField />
    </FieldGroup>
  );
};
