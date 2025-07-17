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
    // Add null/undefined check
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '$0';
    }

    const numAmount = Number(amount);

    if (numAmount >= 1000000) {
        return `$${(numAmount / 1000000).toFixed(1)}M`;
    } else if (numAmount >= 1000) {
        return `$${(numAmount / 1000).toFixed(0)}K`;
    }
    return `$${numAmount.toFixed(0)}`;
};

export const calculateMetrics = (markets) => {
    const totalMarkets = markets.length;
    const avgApy = markets.length > 0 ?
        (markets.reduce((sum, m) => sum + (parseFloat(m.impliedApy || 0) * 100), 0) / markets.length) : 0;
    const totalLiquidity = markets.reduce((summ, s) => summ + parseFloat(s.liquidity || 0), 0);

    return { totalMarkets, avgApy, totalLiquidity };
};

export const getTrendIndicator = (chartData) => {
    if (chartData.length < 2) return { value: 0, isPositive: true };
    const current = chartData[chartData.length - 1]?.apy || 0;
    const previous = chartData[chartData.length - 2]?.apy || 0;
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isPositive: change >= 0 };
};