import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { currencies } from "@/data/currencies";
import { useAppStore } from "@/store/appStore";
import { CurrencySymbol } from "./CurrencySymbol";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CurrencySelect: FC = () => {
  const { currency, setCurrency } = useAppStore(
    useShallow((state) => ({
      currency: state.currency,
      setCurrency: state.setCurrency,
    })),
  );

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex flex-row-reverse gap-[1ch]">
              <span>{currency.name}</span>
              <span aria-hidden className="text-muted-foreground">
                <CurrencySymbol currency={currency.code} />
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
