export function calculateTotalInvested(args: {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
}): number {
  return args.initialInvestment + args.monthlyContribution * 12 * args.years;
}

export function calculateFutureInvestmentValue(args: {
  initialInvestment: number;
  monthlyContribution: number;
  interestRate: number;
  years: number;
}): number {
  const periods = 12 * args.years; // n * t
  const compoundFactor = Math.pow(1 + args.interestRate / 12, periods);
  const compoundInterestForPrincipal = args.initialInvestment * compoundFactor;
  const futureValueOfSeries =
    args.monthlyContribution *
    ((compoundFactor - 1) / (args.interestRate / 12));

  return compoundInterestForPrincipal + futureValueOfSeries;
}

export function calculateYieldValue(args: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return args.futureInvestmentValue - args.totalInvested;
}

export function calculateYieldRatio(args: {
  totalInvested: number;
  futureInvestmentValue: number;
}): number {
  return calculateYieldValue(args) / args.totalInvested;
}
