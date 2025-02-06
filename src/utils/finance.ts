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

  // Compute monthly return and inflation rates
  const monthlyReturn = annualReturn / 12;
  const monthlyInflation = (1 + annualInflation) ** (1 / 12) - 1;

  // Initial value in real terms
  let realValue = initialInvestment;

  for (let month = 0; month < months; month++) {
    // Compute nominal value at the end of the month
    const nominalValue = realValue * (1 + monthlyReturn) + monthlyContribution;

    // Compute real value at the end of the month
    realValue = nominalValue / (1 + monthlyInflation);
  }

  return realValue;
}

export function calculateReturnValue(args: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return args.futureInvestmentValue - args.totalInvested;
}

export function calculateRateOfReturn(args: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return calculateReturnValue(args) / args.totalInvested;
}
