import { FC } from "react";
import { useInvestmentStore } from "../store/investmentStore";
import { calculateFutureInvestmentValue } from "../utils/math";
import { BarChart } from "./BarChart";

export const ProjectionChart: FC = () => {
  const initialInvestment = useInvestmentStore(
    (state) => state.initialInvestment
  );
  const monthlyContribution = useInvestmentStore(
    (state) => state.monthlyContribution
  );
  const interestRate = useInvestmentStore((state) => state.interestRate);
  const years = useInvestmentStore((state) => state.years);

  const series = Array.from({ length: years }, (_, i) =>
    calculateFutureInvestmentValue({
      years: i + 1,
      initialInvestment,
      monthlyContribution,
      interestRate,
    })
  );

  return (
    <div className="h-48 md:h-64 lg:h-80">
      {series.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Empty chart
        </div>
      ) : (
        <BarChart series={series} />
      )}
    </div>
  );
};
