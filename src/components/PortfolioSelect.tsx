import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FC } from "react";
import { portfolios } from "../data/portfolios";
import { useInvestmentStore } from "../store/investmentStore";

export const PortfolioSelect: FC = () => {
  const interestRate = useInvestmentStore((state) => state.interestRate);

  const setInterestRate = useInvestmentStore((state) => state.setInterestRate);

  return (
    <RadioGroupPrimitive.Root
      className="flex flex-col flex-wrap gap-4 md:flex-row"
      value={String(interestRate)}
      onValueChange={(value) => setInterestRate(Number(value))}
    >
      {portfolios.map(([label, rate], index) => (
        <RadioGroupPrimitive.Item
          key={index}
          value={String(rate)}
          className="inline-flex items-center justify-between gap-4 px-4 py-3 transition-shadow bg-white rounded-md outline-none select-none group aria-checked:bg-black aria-checked:text-white focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
        >
          <span>{label}</span>
          <div className="flex items-center justify-center border border-black rounded-full text-zinc-900 size-5 group-aria-checked:border-none overflow-clip">
            <RadioGroupPrimitive.Indicator className="size-full bg-lime-100">
              <CheckIcon className="size-full" />
            </RadioGroupPrimitive.Indicator>
          </div>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
