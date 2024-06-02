import * as SliderPrimitive from "@radix-ui/react-slider";
import { FC } from "react";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider: FC<Props> = ({ min, max, step = 1, value, onChange }) => {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      className="relative flex items-center w-full h-6 select-none touch-none"
    >
      <SliderPrimitive.Track className="relative h-1 bg-white rounded-full grow">
        <SliderPrimitive.Range className="absolute h-full bg-black rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block transition bg-white rounded-full ring ring-black size-4 hover:bg-lime-100 focus:outline-none focus:scale-125" />
    </SliderPrimitive.Root>
  );
};
