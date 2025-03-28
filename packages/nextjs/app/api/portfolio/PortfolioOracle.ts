export interface PortfolioValue {
  formattedValue: bigint;
  portfolioValue: number;
  lastUpdated: Date | null;
  source?: string;
}

interface PortfolioWallet {
  valueSynced: number;
  walletAddress: string;
}

export class PortfolioOracle {
  private fundManagerAddress: string;

  constructor(address: string) {
    this.fundManagerAddress = address;
  }

  async getPortfolioValue(): Promise<PortfolioValue | null> {
    try {
      // Get the primary endpoint
      let primaryValue = null;

      const primaryEndpointUrl = process.env.PORTFOLIO_UPDATE_PRIMARY_ENDPOINT;
      if (!primaryEndpointUrl) {
        console.info("Primary Portfolio Value endpoint is not configured!");
      } else {
        console.info("Checking Primary endpoint...");
        primaryValue = await this.getExternalPortfolioValueFrom(
          primaryEndpointUrl,
          process.env.PORTFOLIO_UPDATE_PRIMARY_DATA,
        );

        if (primaryValue) {
          primaryValue.source = "primary";
          console.info(
            `Primary endpoint result: ${primaryValue.portfolioValue} from: ${
              primaryValue.lastUpdated ? primaryValue.lastUpdated.toISOString() : "N/A"
            }`,
          );
        } else console.info("Primary endpoint failed!");
      }

      // Check the secondary endpoint as a backup
      let secondaryValue = null;

      const secondaryEndpointUrl = process.env.PORTFOLIO_UPDATE_SECONDARY_ENDPOINT;
      if (!secondaryEndpointUrl) {
        console.info("Secondary Portfolio Value endpoint is not configured!");
      } else {
        console.info("Checking secondary endpoint...");
        secondaryValue = await this.getExternalPortfolioValueFrom(
          secondaryEndpointUrl,
          process.env.PORTFOLIO_UPDATE_SECONDARY_DATA,
        );

        if (secondaryValue) {
          secondaryValue.source = "secondary";
          console.info(
            `Secondary endpoint result: ${secondaryValue.portfolioValue} from: ${
              secondaryValue.lastUpdated ? secondaryValue.lastUpdated.toISOString() : "N/A"
            }`,
          );
        } else console.info("Secondary endpoint failed!");
      }

      return this.resolvePortfolioValue(primaryValue, secondaryValue);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  }

  private resolvePortfolioValue(
    primary: PortfolioValue | null,
    secondary: PortfolioValue | null,
  ): PortfolioValue | null {
    // We don't have any data
    if (!primary && !secondary) throw "Both primary and secondary endpoints failed!";

    // We have data from both endpoints, pick the most recent one
    if (primary && secondary) {
      if (primary.lastUpdated && secondary.lastUpdated) {
        if (primary.lastUpdated > secondary.lastUpdated) return primary;
        else return secondary;
      }

      if (primary.lastUpdated) return primary;
      else return secondary;
    }

    if (primary) return primary;
    else return secondary;
  }

  private async getExternalPortfolioValueFrom(url: string, body: string | undefined): Promise<PortfolioValue | null> {
    try {
      const response = await fetch(url, {
        method: body ? "POST" : "GET",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw `Url: ${url}, Status Code: ${response.status}`;
      }

      const data = await response.json();
      return this.calculatePortfolioValue(data);
    } catch (error) {
      console.error("Error fetching portfolio value:", error);
      return null;
    }
  }

  private calculatePortfolioValue(data: {
    portfolioValue: number;
    lastUpdated: string | number | Date;
    portfolio: [] | null;
  }): PortfolioValue {
    let portfolioValue = Math.round(data.portfolioValue * 100) / 100; // Round to 2 decimal places
    let formattedValue = BigInt(parseInt((portfolioValue * 1000000).toString(), 10));
    const lastUpdated = data.lastUpdated ? new Date(data.lastUpdated) : null;

    //If we have full portfolio data, calculate the portfolio value as a sum of all wallets (excluding the fund manager wallet)
    if (!data.portfolio || data.portfolio.length === 0)
      return { formattedValue, portfolioValue, lastUpdated } as PortfolioValue;

    // Calculate sum of all valueSynced (excluding the balances in the fund manager wallet if it is present)
    portfolioValue = data.portfolio.reduce(
      (sum: number, wallet: PortfolioWallet) =>
        wallet.walletAddress?.toLowerCase() !== this.fundManagerAddress.toLowerCase() ? sum + wallet.valueSynced : sum,
      0,
    );

    formattedValue = BigInt(parseInt((portfolioValue * 1000000).toString(), 10));

    return { formattedValue, portfolioValue, lastUpdated } as PortfolioValue;
  }
}
