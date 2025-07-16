// components/ChainSelector.js
import React from 'react';

const ChainSelector = ({ chainId, onChainChange }) => {
    return (
        <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Select Chain ID:</label>
            <select
                value={chainId}
                onChange={(e) => onChainChange(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
            >
                <option value={8453}>Base (8453)</option>
                <option value={1}>Ethereum Mainnet (1)</option>
                <option value={42161}>Arbitrum (42161)</option>
                <option value={56}>BNB Chain (56)</option>
            </select>
        </div>
    );
};

export default ChainSelector;