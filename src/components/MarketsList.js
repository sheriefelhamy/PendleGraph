import React from 'react';
import MarketCard from './MarketCard';

const MarketsList = ({ markets, selectedMarket, onMarketSelect }) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Active Markets</h2>
                <div className="space-y-4">
                    {markets.map((market) => (
                        <MarketCard
                            key={market.id}
                            market={market}
                            isSelected={selectedMarket?.id === market.id}
                            onSelect={onMarketSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketsList;