import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { annualInflationRange } from "@/constants";
import { useAppStore } from "@/store/appStore";
import { FormattedNumber } from "./FormattedNumber";
import { Slider } from "./ui/slider";

export const InflationRateSlider: FC = () => {
  const { annualInflation, setAnnualInflation } = useAppStore(
    useShallow((state) => ({
      annualInflation: state.annualInflation,
      setAnnualInflation: state.setAnnualInflation,
    })),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="font-medium text-xl/none">
        <FormattedNumber value={annualInflation} style="percent" />
      </div>

      <Slider
        min={annualInflationRange[0]}
        max={annualInflationRange[1]}
        step={0.01}
        value={[annualInflation]}
        onValueChange={([v]) => setAnnualInflation(v)}
      />
    </div>
  );
};
