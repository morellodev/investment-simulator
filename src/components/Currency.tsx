import { FC } from "react";

export const Currency: FC<{ value: number }> = ({ value }) => {
  return (
    <span>
      {value.toLocaleString("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })}
    </span>
  );
};
