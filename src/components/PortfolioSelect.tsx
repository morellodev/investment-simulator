import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { RadioCardItem, RadioCards } from "./RadioCards";

export const PortfolioSelect: FC = () => {
  const { interestRate, setInterestRate } = useInvestmentStore();

  return (
    <RadioCards
      value={String(interestRate)}
      onValueChange={(value) => setInterestRate(Number(value))}
    >
      <RadioCardItem value="0.05">Conservative</RadioCardItem>
      <RadioCardItem value="0.075">Balanced</RadioCardItem>
      <RadioCardItem value="0.1">High Yield</RadioCardItem>
    </RadioCards>
  );
};
