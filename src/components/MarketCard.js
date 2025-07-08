import React from 'react';
import { formatCurrency, formatAPY, getChainColor } from '../utils/formatters';

const MarketCard = ({ market, isSelected, onSelect }) => {
    return (
        <div
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                ? 'bg-indigo-50 border-2 border-indigo-200 shadow-md'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
            onClick={onSelect}
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{market.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChainColor(market.chain)}`}>
                    {market.chain}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Current APY</p>
                    <p className="font-semibold text-green-600">{formatAPY(market.currentAPY)}</p>
                </div>
                <div>
                    <p className="text-gray-500">TVL</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(market.tvl)}</p>
                </div>
            </div>
        </div>
    );
};

export default MarketCard;