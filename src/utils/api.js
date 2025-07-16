// utils/api.js
export const fetchActiveMarkets = async (chainId) => {
    const url = `https://api-v2.pendle.finance/core/v1/${chainId}/markets/active`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        let markets = [];

        if (Array.isArray(data)) {
            markets = data;
        } else if (data.results && Array.isArray(data.results)) {
            markets = data.results;
        } else if (data.data && Array.isArray(data.data)) {
            markets = data.data;
        } else if (typeof data === 'object' && data !== null) {
            if (data.address || data.id || data.marketAddress) {
                markets = [data];
            } else {
                const arrayValues = Object.values(data).filter(val => Array.isArray(val));
                if (arrayValues.length > 0) {
                    markets = arrayValues[0];
                }
            }
        }

        if (markets.length === 0) {
            throw new Error('No active markets returned from the API');
        }

        return markets;
    } catch (err) {
        console.error('Error in fetchActiveMarkets:', err);
        throw err;
    }
};

export const fetchMarketDetails = async (marketAddress, chainId) => {
    const url = `https://api-v2.pendle.finance/core/v1/${chainId}/markets/${marketAddress}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch market ${marketAddress}`);
        const data = await res.json();

        // Debug: Log the actual response to see what fields are available
        console.log('Market details response:', data);

        return data;
    } catch (err) {
        console.warn(`Error fetching market ${marketAddress}:`, err);
        return null;
    }
};

export const fetchMarketHistoricalData = async (marketAddress, chainId) => {
    try {
        const endpoint = `https://api-v2.pendle.finance/core/v1/${chainId}/markets/${marketAddress}/historical-data?time_frame=week`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(`Error fetching data for market ${marketAddress}:`, err);
        return null;
    }
};