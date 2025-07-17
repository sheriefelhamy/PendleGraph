// components/MetricsCards.js
import React from 'react';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/dataUtils';

const MetricsCards = ({ totalMarkets, avgApy, totalLiquidity }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Total Markets</span>
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{totalMarkets}</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Avg APY</span>
                    <div className="p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{avgApy.toFixed(2)}%</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Total liquidity</span>
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                    </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalLiquidity)}</div>
            </div>
        </div>
    );
};

export default MetricsCards;