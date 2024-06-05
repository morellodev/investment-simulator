import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { portfolios } from "../data/portfolios";
import { useInvestmentStore } from "../store/investmentStore";
import { ReturnRate } from "./ReturnRate";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";

export const PortfolioSelect: FC = () => {
  const form = useForm();

  const interestRate = useInvestmentStore((state) => state.interestRate);
  const setInterestRate = useInvestmentStore((state) => state.setInterestRate);

  return (
    <Form {...form}>
      <form>
        <FormField
          name="portfolio"
          render={() => (
            <FormItem>
              <FormLabel>Select Portfolio</FormLabel>
              <FormControl>
                <RadioGroupPrimitive.Root
                  className="flex flex-col flex-wrap gap-4 md:flex-row"
                  value={String(interestRate)}
                  onValueChange={(value) => setInterestRate(Number(value))}
                >
                  {portfolios.map(([label, rate], index) => (
                    <RadioGroupPrimitive.Item
                      key={index}
                      value={String(rate)}
                      className="inline-flex items-center justify-between gap-4 px-4 py-3 transition-shadow border rounded-md outline-none select-none bg-background text-foreground ring-offset-background group aria-checked:bg-primary aria-checked:border-transparent aria-checked:text-primary-foreground focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                    >
                      <span>{label}</span>
                      <div className="flex items-center justify-center border rounded-full text-primary size-5 group-aria-checked:border-none overflow-clip">
                        <RadioGroupPrimitive.Indicator className="bg-background size-full">
                          <CheckIcon className="size-full" />
                        </RadioGroupPrimitive.Indicator>
                      </div>
                    </RadioGroupPrimitive.Item>
                  ))}
                </RadioGroupPrimitive.Root>
              </FormControl>
              <FormDescription>
                <ReturnRate />
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
