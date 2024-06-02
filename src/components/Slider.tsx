import * as SliderPrimitive from "@radix-ui/react-slider";
import { FC } from "react";

type Props = {
  ariaLabel: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider: FC<Props> = ({
  ariaLabel,
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      className="relative flex items-center w-full h-6 select-none touch-none group"
    >
      <SliderPrimitive.Track className="relative h-1 bg-white rounded-full grow">
        <SliderPrimitive.Range className="absolute h-full bg-black rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        className="block transition bg-white rounded-full ring ring-black size-4 group-hover:scale-125 focus:outline-none focus:scale-125"
      />
    </SliderPrimitive.Root>
  );
};
