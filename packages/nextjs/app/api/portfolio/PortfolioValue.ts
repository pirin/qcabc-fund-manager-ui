export function getPortfolioValueRandom() {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const portfolioValue = randomNumber * 1000000;

  // Format value with proper decimals (USDC has 6 decimals)
  const formattedValue = BigInt(portfolioValue);
  return { formattedValue, portfolioValue };
}

export async function getExternalPortfolioValue() {
  try {
    const endpointUrl = process.env.PORTFOLIO_UPDATE_ENDPOINT;
    if (!endpointUrl) {
      throw new Error("PORTFOLIO_UPDATE_ENDPOINT environment variable is required");
    }
    const response = await fetch(endpointUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch portfolio value");
    }

    const data = await response.json();
    const portfolioValue = Math.round(data.portfolioValue * 100) / 100; // Round to 2 decimal places
    const formattedValue = BigInt(parseInt((portfolioValue * 1000000).toString(), 10));

    return { formattedValue, portfolioValue };
  } catch (error) {
    console.error("Error fetching portfolio value:", error);
    throw new Error("Failed to fetch portfolio value");
  }
}
