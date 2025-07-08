// src/services/pendleApi.js
class PendleApiService {
    constructor() {
        this.baseUrl = 'https://api-v2.pendle.finance/core';
        this.sdkUrl = 'https://api-v2.pendle.finance/sdk';
        this.timeout = 10000; // 10 seconds timeout
    }

    // Helper method to make API calls with timeout and error handling
    async makeRequest(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }

    // Get all markets for a specific chain
    async getMarkets(chainId = 8453) {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/v1/${chainId}/markets/all`);
            return response.results || [];
        } catch (error) {
            console.error('Error fetching markets:', error);
            throw new Error(`Failed to fetch markets: ${error.message}`);
        }
    }

    // Get detailed information for a specific market
    async getMarketDetails(chainId, marketAddress) {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/v1/${chainId}/markets/${marketAddress}`);
            return response;
        } catch (error) {
            console.error('Error fetching market details:', error);
            throw new Error(`Failed to fetch market details: ${error.message}`);
        }
    }

    // Get historical APY data for a market
    async getHistoricalApy(chainId, marketAddress, days = 7) {
        try {
            const endTime = Math.floor(Date.now() / 1000);
            const startTime = endTime - (days * 24 * 60 * 60);

            const response = await this.makeRequest(
                `${this.baseUrl}/v1/${chainId}/markets/${marketAddress}/historical-apy?start=${startTime}&end=${endTime}&interval=86400`
            );

            return response.results || [];
        } catch (error) {
            console.error('Error fetching historical APY:', error);
            return []; // Return empty array instead of throwing
        }
    }

    // Get market stats/analytics
    async getMarketStats(chainId, marketAddress) {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/v1/${chainId}/markets/${marketAddress}/stats`);
            return response;
        } catch (error) {
            console.error('Error fetching market stats:', error);
            return null;
        }
    }

    // Get yield data for a market
    async getYieldData(chainId, marketAddress) {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/v1/${chainId}/markets/${marketAddress}/yield`);
            return response;
        } catch (error) {
            console.error('Error fetching yield data:', error);
            return null;
        }
    }

    // Format market data for the frontend
    formatMarketData(rawMarket, chainId, historicalData = []) {
        return {
            id: rawMarket.address,
            name: this.formatMarketName(rawMarket),
            symbol: rawMarket.pt?.symbol || rawMarket.symbol || 'Unknown',
            chain: this.getChainName(chainId),
            address: rawMarket.address,
            currentAPY: this.parseAPY(rawMarket.impliedApy),
            tvl: this.parseTVL(rawMarket.totalActiveSupply),
            maturity: this.formatMaturity(rawMarket.expiry),
            historicalData: this.formatHistoricalData(historicalData),
            // Additional market info
            pt: rawMarket.pt,
            yt: rawMarket.yt,
            sy: rawMarket.sy,
            liquidity: this.parseLiquidity(rawMarket.totalLiquidity),
            volume24h: this.parseVolume(rawMarket.volume24h),
            isActive: rawMarket.isActive || true,
            underlyingAsset: rawMarket.underlyingAsset,
            baseAsset: rawMarket.baseAsset
        };
    }

    // Helper methods for data formatting
    formatMarketName(market) {
        if (market.name) return market.name;
        if (market.pt?.symbol) return `${market.pt.symbol}-PT`;
        return 'Unknown Market';
    }

    parseAPY(apy) {
        if (!apy) return 0;
        return typeof apy === 'string' ? parseFloat(apy) : apy;
    }

    parseTVL(tvl) {
        if (!tvl) return 0;
        return typeof tvl === 'string' ? parseFloat(tvl) : tvl;
    }

    parseLiquidity(liquidity) {
        if (!liquidity) return 0;
        return typeof liquidity === 'string' ? parseFloat(liquidity) : liquidity;
    }

    parseVolume(volume) {
        if (!volume) return 0;
        return typeof volume === 'string' ? parseFloat(volume) : volume;
    }

    formatMaturity(expiry) {
        if (!expiry) return null;
        const date = new Date(expiry * 1000);
        return date.toISOString().split('T')[0];
    }

    formatHistoricalData(historicalData) {
        if (!Array.isArray(historicalData)) return [];

        return historicalData.map(item => ({
            date: new Date(item.timestamp * 1000).toISOString().split('T')[0],
            apy: this.parseAPY(item.impliedApy),
            timestamp: item.timestamp * 1000
        }));
    }

    getChainName(chainId) {
        const chainMap = {
            1: 'ethereum',
            42161: 'arbitrum',
            8453: 'base',
            10: 'optimism',
            5000: 'mantle',
            56: 'bsc'
        };
        return chainMap[chainId] || 'unknown';
    }

    // Generate mock historical data when API data is not available
    generateMockHistoricalData(baseApy = 5) {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            // Generate realistic APY variations
            const variation = (Math.random() - 0.5) * 2; // ±1% variation
            data.push({
                date: date.toISOString().split('T')[0],
                apy: Math.max(0, baseApy + variation),
                timestamp: date.getTime()
            });
        }
        return data;
    }
}

// Export singleton instance
export const pendleApi = new PendleApiService();
export default pendleApi;