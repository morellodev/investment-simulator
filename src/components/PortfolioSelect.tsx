import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { pick } from "../utils/object";

const portfolios = [
  ["Conservative", 0.05],
  ["Balanced", 0.075],
  ["High Yield", 0.1],
] as const;

export const PortfolioSelect: FC = () => {
  const { interestRate, setInterestRate } = useInvestmentStore(
    pick(["interestRate", "setInterestRate"])
  );

  return (
    <RadioGroupPrimitive.Root
      className="flex flex-col md:flex-row gap-4"
      value={String(interestRate)}
      onValueChange={(value) => setInterestRate(Number(value))}
    >
      {portfolios.map(([label, rate], index) => (
        <RadioGroupPrimitive.Item
          key={index}
          value={String(rate)}
          className="group inline-flex items-center justify-between select-none gap-4 px-4 py-3 rounded-md outline-none bg-white aria-checked:bg-black aria-checked:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          <span>{label}</span>
          <div className="inline-flex items-center justify-center text-gray-900 shrink-0 size-5 rounded-full border border-black group-aria-checked:border-none overflow-clip">
            <RadioGroupPrimitive.Indicator className="size-full bg-lime-100 text-xs leading-5">
              &#10004;
            </RadioGroupPrimitive.Indicator>
          </div>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
