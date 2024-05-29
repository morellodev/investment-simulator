import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ComponentProps, FC } from "react";

export const RadioCards: FC<ComponentProps<typeof RadioGroupPrimitive.Root>> = (
  props
) => {
  return (
    <RadioGroupPrimitive.Root
      {...props}
      className="flex flex-col md:flex-row gap-4"
    />
  );
};

export const RadioCardItem: FC<
  ComponentProps<typeof RadioGroupPrimitive.Item>
> = ({ children, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      {...props}
      className="group inline-flex items-center justify-between select-none gap-3 p-4 rounded-md outline-none bg-white aria-checked:bg-black aria-checked:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
    >
      {children}
      <div className="inline-flex items-center justify-center text-gray-900 shrink-0 size-5 rounded-full border border-black group-aria-checked:border-none overflow-clip">
        <RadioGroupPrimitive.Indicator className="size-full bg-lime-100 text-xs leading-5">
          &#10004;
        </RadioGroupPrimitive.Indicator>
      </div>
    </RadioGroupPrimitive.Item>
  );
};
