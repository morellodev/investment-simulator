import { type FC, useId } from "react";
import { portfolios } from "@/data/portfolios";
import { useInvestmentStore } from "@/store/investmentStore";
import { ReturnRate } from "./ReturnRate";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export const PortfolioComposer: FC = () => {
  const idPrefix = useId();

  const controlId = `${idPrefix}-control`;
  const descriptionId = `${idPrefix}-description`;

  const portfolioId = useInvestmentStore((state) => state.portfolioId);
  const setPortfolioId = useInvestmentStore((state) => state.setPortfolioId);

  return (
    <fieldset className="@container space-y-2">
      <Label asChild htmlFor={controlId}>
        <legend className="leading-normal">Select Portfolio</legend>
      </Label>
      <RadioGroup
        id={controlId}
        aria-describedby={descriptionId}
        className="flex @md:flex-row flex-col gap-4"
        value={portfolioId}
        onValueChange={setPortfolioId}
      >
        {portfolios.map(({ id, name }) => (
          <PortfolioItem key={id} label={name} value={id} />
        ))}
      </RadioGroup>
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
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: label is used as a wrapper
    <Label className="flex flex-1 items-center justify-between gap-2 rounded-lg border px-4 py-3 text-foreground outline-hidden ring-offset-background transition-shadow hover:bg-accent/50 has-[[data-state=checked]]:border-transparent has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-focus:ring-2 has-focus:ring-ring has-focus:ring-offset-2">
      <span className="font-medium">{label}</span>
      <RadioGroupItem
        value={value}
        className="shadow-none data-[state=checked]:border-accent data-[state=checked]:bg-accent *:data-[slot=radio-group-indicator]:[&>svg]:fill-primary *:data-[slot=radio-group-indicator]:[&>svg]:stroke-primary"
      />
    </Label>
  );
};
