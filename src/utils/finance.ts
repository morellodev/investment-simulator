export function calculateTotalInvested({
  initialInvestment,
  monthlyContribution,
  years,
}: {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
}): number {
  const months = years * 12;
  const totalContribution = monthlyContribution * months;
  return initialInvestment + totalContribution;
}

export function projectInvestmentSeries({
  initialInvestment,
  monthlyContribution,
  annualReturn,
  annualInflation,
  years,
}: InvestmentCalculationParams): number[] {
  const realAnnualReturn = (1 + annualReturn) / (1 + annualInflation) - 1;
  const monthlyRealReturn = realAnnualReturn / 12;

  const series: number[] = [];
  let value = initialInvestment;

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      value = value * (1 + monthlyRealReturn) + monthlyContribution;
    }
    series.push(value);
  }

  return series;
}

export function calculateFutureInvestmentValue(
  params: InvestmentCalculationParams,
): number {
  const series = projectInvestmentSeries(params);
  return series[series.length - 1] ?? params.initialInvestment;
}

export function calculateReturnValue({
  totalInvested,
  futureInvestmentValue,
}: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return futureInvestmentValue - totalInvested;
}

export function calculateTotalReturn({
  totalInvested,
  futureInvestmentValue,
}: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return (
    calculateReturnValue({ totalInvested, futureInvestmentValue }) /
    totalInvested
  );
}

type InvestmentCalculationParams = {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  annualInflation: number;
  years: number;
};

type InvestmentCalculationResults = {
  totalInvested: number;
  futureInvestmentValue: number;
  returnValue: number;
  totalReturn: number;
};

export function calculateInvestmentMetrics(
  params: InvestmentCalculationParams,
): InvestmentCalculationResults {
  const totalInvested = calculateTotalInvested(params);
  const futureInvestmentValue = calculateFutureInvestmentValue(params);
  const returnValue = calculateReturnValue({
    totalInvested,
    futureInvestmentValue,
  });
  const totalReturn = calculateTotalReturn({
    totalInvested,
    futureInvestmentValue,
  });

  return {
    totalInvested,
    futureInvestmentValue,
    returnValue,
    totalReturn,
  };
}
