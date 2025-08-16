import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { annualInflationRange } from "@/constants";
import { useAppStore } from "@/store/appStore";
import { FormattedNumber } from "./FormattedNumber";
import { Slider } from "./ui/slider";

export const InflationRateSlider: FC = () => {
  const { annualInflationCent, setAnnualInflationCent } = useAppStore(
    useShallow((state) => ({
      annualInflationCent: state.annualInflationCent,
      setAnnualInflationCent: state.setAnnualInflationCent,
    })),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="font-medium text-xl/none">
        <FormattedNumber value={annualInflationCent / 100} style="percent" />
      </div>

      <Slider
        min={annualInflationRange[0]}
        max={annualInflationRange[1]}
        value={[annualInflationCent]}
        onValueChange={([v]) => setAnnualInflationCent(v)}
      />
    </div>
  );
};
