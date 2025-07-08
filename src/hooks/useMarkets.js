// src/hooks/useMarkets.js
import { useState, useEffect } from 'react';
import pendleApi from '../services/pendleApi';

export const useMarkets = (chainId = 8453) => { // Default to Base chain
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMarkets = async () => {
        setLoading(true);
        setError(null);

        try {
            // Get all markets for the specified chain
            const rawMarkets = await pendleApi.getMarkets(chainId);

            if (!Array.isArray(rawMarkets)) {
                throw new Error('Invalid response format');
            }

            // Process first 10 markets to avoid overwhelming the API
            const marketPromises = rawMarkets.slice(0, 10).map(async (market) => {
                try {
                    // Get historical data for each market
                    const historicalData = await pendleApi.getHistoricalApy(chainId, market.address, 7);

                    // Format the market data
                    const formattedMarket = pendleApi.formatMarketData(market, chainId, historicalData);

                    // If no historical data from API, generate mock data
                    if (formattedMarket.historicalData.length === 0) {
                        formattedMarket.historicalData = pendleApi.generateMockHistoricalData(formattedMarket.currentAPY);
                    }

                    return formattedMarket;
                } catch (marketError) {
                    console.error(`Error processing market ${market.address}:`, marketError);
                    // Return basic market info if detailed processing fails
                    return {
                        id: market.address,
                        name: market.name || 'Unknown Market',
                        symbol: market.pt?.symbol || 'Unknown',
                        chain: pendleApi.getChainName(chainId),
                        address: market.address,
                        currentAPY: market.impliedApy || 0,
                        tvl: market.totalActiveSupply || 0,
                        maturity: market.expiry ? new Date(market.expiry * 1000).toISOString().split('T')[0] : null,
                        historicalData: pendleApi.generateMockHistoricalData(market.impliedApy || 5),
                        liquidity: market.totalLiquidity || 0,
                        volume24h: market.volume24h || 0
                    };
                }
            });

            const processedMarkets = await Promise.all(marketPromises);
            const validMarkets = processedMarkets.filter(market => market !== null);

            setMarkets(validMarkets);

        } catch (err) {
            console.error('Error fetching markets:', err);
            setError(err.message || 'Failed to fetch markets');

            // Fallback to mock data if API completely fails
            const mockMarkets = [
                {
                    id: 'mock-1',
                    name: 'stETH-PT',
                    symbol: 'stETH',
                    chain: 'base',
                    currentAPY: 5.2,
                    tvl: 1250000,
                    maturity: '2024-12-31',
                    historicalData: pendleApi.generateMockHistoricalData(5.2),
                    liquidity: 500000,
                    volume24h: 25000
                },
                {
                    id: 'mock-2',
                    name: 'ezETH-PT',
                    symbol: 'ezETH',
                    chain: 'base',
                    currentAPY: 6.1,
                    tvl: 2100000,
                    maturity: '2025-01-31',
                    historicalData: pendleApi.generateMockHistoricalData(6.1),
                    liquidity: 800000,
                    volume24h: 45000
                },
                {
                    id: 'mock-3',
                    name: 'sDAI-PT',
                    symbol: 'sDAI',
                    chain: 'base',
                    currentAPY: 3.8,
                    tvl: 890000,
                    maturity: '2024-11-30',
                    historicalData: pendleApi.generateMockHistoricalData(3.8),
                    liquidity: 300000,
                    volume24h: 15000
                }
            ];
            setMarkets(mockMarkets);
        } finally {
            setLoading(false);
        }
    };

    // Refresh markets data
    const refreshMarkets = async () => {
        await fetchMarkets();
    };

    // Fetch markets on mount or when chainId changes
    useEffect(() => {
        fetchMarkets();
    }, [chainId]);

    return {
        markets,
        loading,
        error,
        refreshMarkets,
        chainId
    };
};