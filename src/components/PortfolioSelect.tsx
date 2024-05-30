import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { CheckIcon } from "@radix-ui/react-icons";

const portfolios = [
  ["Conservative", 0.05],
  ["Balanced", 0.075],
  ["High Yield", 0.1],
] as const;

export const PortfolioSelect: FC = () => {
  const interestRate = useInvestmentStore((state) => state.interestRate);

  const setInterestRate = useInvestmentStore((state) => state.setInterestRate);

  return (
    <RadioGroupPrimitive.Root
      className="flex flex-col gap-4 md:flex-row"
      value={String(interestRate)}
      onValueChange={(value) => setInterestRate(Number(value))}
    >
      {portfolios.map(([label, rate], index) => (
        <RadioGroupPrimitive.Item
          key={index}
          value={String(rate)}
          className="inline-flex items-center justify-between gap-4 px-4 py-3 bg-white rounded-md outline-none select-none group aria-checked:bg-black aria-checked:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          <span>{label}</span>
          <div className="inline-flex items-center justify-center text-gray-900 border border-black rounded-full shrink-0 size-5 group-aria-checked:border-none overflow-clip">
            <RadioGroupPrimitive.Indicator className="size-full bg-lime-100">
              <CheckIcon className="size-full" />
            </RadioGroupPrimitive.Indicator>
          </div>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
