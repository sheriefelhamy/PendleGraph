// src/components/APYChart.js
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const APYChart = ({ selectedMarket }) => {
    const [timeRange, setTimeRange] = useState('7d');

    // Filter data based on selected time range
    const filteredData = useMemo(() => {
        if (!selectedMarket?.historicalData) return [];

        const now = Date.now();
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const cutoffTime = now - (days * 24 * 60 * 60 * 1000);

        return selectedMarket.historicalData.filter(item =>
            item.timestamp >= cutoffTime
        ).sort((a, b) => a.timestamp - b.timestamp);
    }, [selectedMarket, timeRange]);

    // Calculate APY trend
    const apyTrend = useMemo(() => {
        if (filteredData.length < 2) return null;

        const first = filteredData[0].apy;
        const last = filteredData[filteredData.length - 1].apy;
        const change = last - first;
        const percentChange = (change / first) * 100;

        return {
            change: change.toFixed(2),
            percentChange: percentChange.toFixed(2),
            isPositive: change >= 0
        };
    }, [filteredData]);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-600">{`Date: ${label}`}</p>
                    <p className="text-lg font-bold text-indigo-600">
                        {`APY: ${payload[0].value.toFixed(2)}%`}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (!selectedMarket) {
        return (
            <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="flex items-center justify-center h-96">
                        <p className="text-gray-500 text-lg">Select a market to view APY chart</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">
                            {selectedMarket.name} APY Trend
                        </h2>
                        {apyTrend && (
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${apyTrend.isPositive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {apyTrend.isPositive ? (
                                    <TrendingUp className="h-4 w-4" />
                                ) : (
                                    <TrendingDown className="h-4 w-4" />
                                )}
                                <span>{apyTrend.isPositive ? '+' : ''}{apyTrend.change}%</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>
                    </div>
                </div>

                {/* Market Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Current APY</p>
                        <p className="text-lg font-bold text-indigo-600">
                            {selectedMarket.currentAPY.toFixed(2)}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">TVL</p>
                        <p className="text-lg font-bold text-gray-900">
                            ${(selectedMarket.tvl / 1000000).toFixed(2)}M
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-500">Maturity</p>
                        <p className="text-lg font-bold text-gray-900">
                            {selectedMarket.maturity || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="date"
                                stroke="#6b7280"
                                fontSize={12}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    });
                                }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                                tickFormatter={(value) => `${value.toFixed(1)}%`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="apy"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                                name="APY (%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Data Status */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        {filteredData.length > 0
                            ? `Showing ${filteredData.length} data points`
                            : 'No data available for selected time range'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default APYChart;