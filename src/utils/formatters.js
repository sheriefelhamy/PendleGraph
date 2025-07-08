export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatAPY = (apy) => `${apy.toFixed(2)}%`;

export const getChainColor = (chain) => {
    switch (chain) {
        case 'ethereum': return 'bg-blue-100 text-blue-800';
        case 'base': return 'bg-purple-100 text-purple-800';
        case 'arbitrum': return 'bg-cyan-100 text-cyan-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};