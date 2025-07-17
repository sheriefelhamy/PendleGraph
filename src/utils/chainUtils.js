// utils/chainUtils.js
export const getChainInfo = (chainId) => {
    const chains = {
        8453: { name: 'Base', symbol: 'base', color: 'bg-blue-100 text-blue-800' },
        1: { name: 'Ethereum', symbol: 'eth', color: 'bg-gray-100 text-gray-800' },
        42161: { name: 'Arbitrum', symbol: 'arb', color: 'bg-blue-100 text-blue-800' },
        56: { name: 'BNB Chain', symbol: 'bnb', color: 'bg-yellow-100 text-yellow-800' }
    };

    return chains[chainId] || { name: 'Unknown', symbol: 'unknown', color: 'bg-gray-100 text-gray-800' };
};