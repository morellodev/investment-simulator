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

export function calculateFutureInvestmentValue({
  initialInvestment,
  monthlyContribution,
  annualReturn,
  annualInflation,
  years,
}: {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  annualInflation: number;
  years: number;
}): number {
  const months = years * 12;

  // Compute real rate of return
  const realAnnualReturn = (1 + annualReturn) / (1 + annualInflation) - 1;
  const monthlyRealReturn = realAnnualReturn / 12;

  // Initial value
  let value = initialInvestment;

  // Compound monthly with real rate of return
  for (let month = 0; month < months; month++) {
    value = value * (1 + monthlyRealReturn) + monthlyContribution;
  }

  return value;
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

export function calculateRateOfReturn({
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
  rateOfReturn: number;
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
  const rateOfReturn = calculateRateOfReturn({
    totalInvested,
    futureInvestmentValue,
  });

  return {
    totalInvested,
    futureInvestmentValue,
    returnValue,
    rateOfReturn,
  };
}
