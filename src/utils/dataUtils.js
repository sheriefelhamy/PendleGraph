// utils/dataUtils.js
export const parseHistoricalData = (data, marketInfo) => {
    if (!data || !Array.isArray(data.timestamp)) {
        return [];
    }

    return data.timestamp.map((ts, i) => ({
        timestamp: ts * 1000,
        date: new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        impliedApy: parseFloat(data.impliedApy?.[i]) * 100,
        baseApy: parseFloat(data.baseApy?.[i]) * 100,
        marketAddress: marketInfo.address,
        marketName: marketInfo.name || marketInfo.symbol || `Market ${marketInfo.address?.slice(0, 8)}...`
    }));
};

export const formatCurrency = (amount) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
};

export const calculateMetrics = (markets) => {
    const totalMarkets = markets.length;
    const avgApy = markets.length > 0 ?
        (markets.reduce((sum, m) => sum + (parseFloat(m.impliedApy || 0) * 100), 0) / markets.length) : 0;
    const totalTVL = markets.reduce((sum, m) => sum + (parseFloat(m.tvl || m.totalValueLocked || 0)), 0);

    return { totalMarkets, avgApy, totalTVL };
};

export const getTrendIndicator = (chartData) => {
    if (chartData.length < 2) return { value: 0, isPositive: true };
    const current = chartData[chartData.length - 1]?.apy || 0;
    const previous = chartData[chartData.length - 2]?.apy || 0;
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isPositive: change >= 0 };
};