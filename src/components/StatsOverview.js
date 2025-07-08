import React from 'react';
import { TrendingUp, Activity, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { formatCurrency, formatAPY } from '../utils/formatters';

const StatsOverview = ({ markets }) => {
    const avgAPY = markets.reduce((sum, m) => sum + m.currentAPY, 0) / markets.length;
    const totalTVL = markets.reduce((sum, m) => sum + m.tvl, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
                title="Total Markets"
                value={markets.length}
                icon={Activity}
                iconColor="bg-indigo-100 text-indigo-600"
            />
            <StatsCard
                title="Avg APY"
                value={formatAPY(avgAPY)}
                icon={TrendingUp}
                iconColor="bg-green-100 text-green-600"
            />
            <StatsCard
                title="Total TVL"
                value={formatCurrency(totalTVL)}
                icon={DollarSign}
                iconColor="bg-purple-100 text-purple-600"
            />
        </div>
    );
};

export default StatsOverview;