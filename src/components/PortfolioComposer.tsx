import { portfolios } from "@/data/portfolios";
import { useInvestmentStore } from "@/store/investmentStore";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckIcon } from "lucide-react";
import { type FC, useId } from "react";
import { ReturnRate } from "./ReturnRate";
import { Label } from "./ui/label";

export const PortfolioComposer: FC = () => {
  const descriptionId = useId();

  const interestRate = useInvestmentStore((state) => state.interestRate);
  const setInterestRate = useInvestmentStore((state) => state.setInterestRate);

  return (
    <fieldset className="space-y-2">
      <Label asChild={true}>
        <legend className="leading-normal">Select Portfolio</legend>
      </Label>
      <RadioGroupPrimitive.Root
        aria-describedby={descriptionId}
        className="flex flex-col flex-wrap gap-4 md:flex-row"
        value={String(interestRate)}
        onValueChange={(value) => setInterestRate(Number(value))}
      >
        {portfolios.map(([label, rate]) => (
          <PortfolioItem key={rate} label={label} value={String(rate)} />
        ))}
      </RadioGroupPrimitive.Root>
      <p id={descriptionId} className="text-xs text-muted-foreground">
        <ReturnRate />
      </p>
    </fieldset>
  );
};

const PortfolioItem: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  const id = useId();

  return (
    <div className="relative inline-flex items-center justify-between gap-4 px-4 py-3 transition-shadow border rounded-md outline-none select-none bg-background text-foreground ring-offset-background has-[[aria-checked=true]]:bg-primary has-[[aria-checked=true]]:border-transparent has-[[aria-checked=true]]:text-primary-foreground has-[:focus]:ring-2 has-[:focus]:ring-offset-2 has-[:focus]:ring-ring">
      <label htmlFor={id}>{label}</label>
      <RadioGroupPrimitive.Item
        id={id}
        className="flex items-center justify-center border rounded-full outline-none overflow-clip text-primary size-5 aria-checked:border-none before:absolute before:inset-0"
        value={value}
      >
        <RadioGroupPrimitive.Indicator className="p-0.5 bg-background size-full">
          <CheckIcon className="size-full" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </div>
  );
};
