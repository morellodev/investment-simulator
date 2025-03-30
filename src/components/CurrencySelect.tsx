import { currencies } from "@/data/currencies";
import { useInvestmentStore } from "@/store/investmentStore";
import type { FC } from "react";
import { CurrencySymbol } from "./CurrencySymbol";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CurrencySelect: FC = () => {
  const value = useInvestmentStore((state) => state.currency);
  const setValue = useInvestmentStore((state) => state.setCurrency);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.name} (<CurrencySymbol currency={currency.code} />)
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
