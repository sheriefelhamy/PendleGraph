import { useState, useEffect } from 'react';

const useMarkets = () => {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMarket, setSelectedMarket] = useState(null);

    // Mock data for demonstration (replace with actual API calls)
    const mockMarkets = [
        {
            id: '1',
            name: 'stETH-PT',
            symbol: 'stETH',
            chain: 'ethereum',
            currentAPY: 5.2,
            tvl: 1250000,
            maturity: '2024-12-31',
            historicalData: [
                { date: '2024-07-01', apy: 4.8, timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-02', apy: 4.9, timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-03', apy: 5.1, timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-04', apy: 5.0, timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-05', apy: 5.3, timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-06', apy: 5.2, timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-07', apy: 5.2, timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-08', apy: 5.2, timestamp: Date.now() }
            ]
        },
        {
            id: '2',
            name: 'sDAI-PT',
            symbol: 'sDAI',
            chain: 'ethereum',
            currentAPY: 3.8,
            tvl: 890000,
            maturity: '2024-11-30',
            historicalData: [
                { date: '2024-07-01', apy: 3.5, timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-02', apy: 3.6, timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-03', apy: 3.7, timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-04', apy: 3.8, timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-05', apy: 3.9, timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-06', apy: 3.8, timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-07', apy: 3.8, timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-08', apy: 3.8, timestamp: Date.now() }
            ]
        },
        {
            id: '3',
            name: 'ezETH-PT',
            symbol: 'ezETH',
            chain: 'base',
            currentAPY: 6.1,
            tvl: 2100000,
            maturity: '2025-01-31',
            historicalData: [
                { date: '2024-07-01', apy: 5.8, timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-02', apy: 5.9, timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-03', apy: 6.0, timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-04', apy: 6.2, timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-05', apy: 6.3, timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-06', apy: 6.1, timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-07', apy: 6.0, timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 },
                { date: '2024-07-08', apy: 6.1, timestamp: Date.now() }
            ]
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchMarkets = async () => {
            setLoading(true);
            try {
                // Replace this with actual Pendle API call
                // const response = await fetch('https://api.pendle.finance/v1/markets');
                // const data = await response.json();

                setTimeout(() => {
                    setMarkets(mockMarkets);
                    setSelectedMarket(mockMarkets[0]);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching markets:', error);
                setLoading(false);
            }
        };

        fetchMarkets();
    }, []);

    return {
        markets,
        loading,
        selectedMarket,
        setSelectedMarket
    };
};

export default useMarkets;