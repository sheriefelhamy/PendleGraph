import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

const APYChart = ({ selectedMarket }) => {
    const [timeRange, setTimeRange] = useState('7d');

    if (!selectedMarket) return null;

    return (
        <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        {selectedMarket.name} APY Trend
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={selectedMarket.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                            domain={['dataMin - 0.5', 'dataMax + 0.5']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [`${value.toFixed(2)}%`, 'APY']}
                        />
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
        </div>
    );
};

export default APYChart;