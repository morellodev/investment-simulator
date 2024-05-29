import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { Field, Input, Label } from "./Field";

export const InvestmentInputs: FC = () => {
  const {
    initialInvestment,
    monthlyContribution,
    years,
    setInitialInvestment,
    setMonthlyContribution,
    setYears,
  } = useInvestmentStore();

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
      <Field>
        <Label>Initial Investment</Label>
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

      <Field>
        <Label>Monthly Contribution</Label>
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

      <Field>
        <Label>Investment Term</Label>
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
    </div>
  );
};
