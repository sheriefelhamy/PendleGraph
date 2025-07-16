// components/MarketsList.js
import React from 'react';
import { formatCurrency } from '../utils/dataUtils';

const MarketsList = ({ markets, selectedMarket, onMarketSelect }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Markets</h2>
            <div className="space-y-3">
                {markets.map((market, index) => {
                    const marketId = market.address || market.id || `market-${index}`;
                    const marketName = market.name || market.symbol || market.token || `Market ${index + 1}`;
                    const currentAPY = parseFloat(market.impliedApy || 0) * 100;
                    const tvl = parseFloat(market.tvl || market.totalValueLocked || 0);
                    const isSelected = selectedMarket === marketId;

                    return (
                        <div
                            key={marketId}
                            onClick={() => onMarketSelect(marketId)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                                ? 'border-blue-300 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 text-sm">
                                    {marketName.length > 20 ? `${marketName.slice(0, 20)}...` : marketName}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    base
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Current APY</span>
                                    <div className="font-semibold text-green-600">{currentAPY.toFixed(2)}%</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">TVL</span>
                                    <div className="font-semibold text-gray-900">{formatCurrency(tvl)}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarketsList;