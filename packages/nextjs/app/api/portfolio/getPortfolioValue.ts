export function getPortfolioValue() {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const portfolioValue = randomNumber * 1000000;

  // Format value with proper decimals (USDC has 6 decimals)
  const formattedValue = BigInt(portfolioValue);
  return { formattedValue, portfolioValue };
}
