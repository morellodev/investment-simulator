import { portfolios } from "@/data/portfolios";
import { useInvestmentStore } from "@/store/investmentStore";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckIcon } from "lucide-react";
import { type FC, useId } from "react";
import { ReturnRate } from "./ReturnRate";
import { Label } from "./ui/label";

export const PortfolioComposer: FC = () => {
  const descriptionId = useId();

  const portfolioId = useInvestmentStore((state) => state.portfolioId);
  const setPortfolioId = useInvestmentStore((state) => state.setPortfolioId);

  return (
    <fieldset className="@container space-y-2">
      <Label asChild>
        <legend className="leading-normal">Select Portfolio</legend>
      </Label>
      <RadioGroupPrimitive.Root
        aria-describedby={descriptionId}
        className="flex @md:flex-row flex-col gap-4"
        value={portfolioId}
        onValueChange={setPortfolioId}
      >
        {portfolios.map(({ id, name }) => (
          <PortfolioItem key={id} label={name} value={id} />
        ))}
      </RadioGroupPrimitive.Root>
      <p id={descriptionId} className="text-muted-foreground text-xs">
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
    <div className="relative inline-flex flex-1 select-none items-center justify-between gap-2 rounded-md border bg-background px-4 py-3 text-foreground outline-hidden ring-offset-background transition-shadow has-aria-checked:border-transparent has-aria-checked:bg-primary has-aria-checked:text-primary-foreground has-focus:ring-2 has-focus:ring-ring has-focus:ring-offset-2">
      <label htmlFor={id}>{label}</label>
      <RadioGroupPrimitive.Item
        id={id}
        className="flex size-5 items-center justify-center overflow-clip rounded-full border text-primary outline-hidden before:absolute before:inset-0 aria-checked:border-none"
        value={value}
      >
        <RadioGroupPrimitive.Indicator className="size-full bg-background p-0.5">
          <CheckIcon className="size-full" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </div>
  );
};
