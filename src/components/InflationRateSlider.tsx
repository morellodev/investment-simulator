import type { FC } from "react";
import { annualInflationRange } from "@/constants";
import { useInvestmentStore } from "@/store/investmentStore";
import { FormattedNumber } from "./FormattedNumber";
import { Slider } from "./ui/slider";

export const InflationRateSlider: FC = () => {
  const value = useInvestmentStore((state) => state.annualInflationCent);
  const setValue = useInvestmentStore((state) => state.setAnnualInflationCent);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-medium text-xl/none">
        <FormattedNumber value={value / 100} style="percent" />
      </div>

      <Slider
        min={annualInflationRange[0]}
        max={annualInflationRange[1]}
        value={[value]}
        onValueChange={([v]) => setValue(v)}
      />
    </div>
  );
};
