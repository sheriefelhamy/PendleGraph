// components/Chart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/dataUtils';

const Chart = ({
    selectedMarketInfo,
    chartData,
    selectedMarket,
    timeFrame,
    onTimeFrameChange,
    trend
}) => {
    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {selectedMarketInfo?.name || selectedMarketInfo?.symbol || 'Select a Market'} APY Trend
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↗' : '↘'} {trend.value.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <select
                        value={timeFrame}
                        onChange={(e) => onTimeFrameChange(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                    </select>
                </div>
            </div>

            {selectedMarketInfo && (
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <span className="text-sm text-gray-500">Current APY</span>
                        <div className="text-lg font-semibold text-blue-600">
                            {chartData.length > 0 ? chartData[chartData.length - 1]?.apy.toFixed(2) : '0.00'}%
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Liquidity</span>
                        <div className="text-lg font-semibold text-gray-900">
                            {formatCurrency(parseFloat(selectedMarketInfo.liquidity || 0))}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Maturity</span>
                        <div className="text-lg font-semibold text-gray-900">
                            {selectedMarketInfo.maturity || '2024-12-31'}
                        </div>
                    </div>
                </div>
            )}

            {chartData.length > 0 ? (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tick={{ fill: '#666' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tick={{ fill: '#666' }}
                                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value) => [`${value.toFixed(2)}%`, 'APY']}
                            />
                            <Line
                                type="monotone"
                                dataKey="apy"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#3b82f6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">
                    {selectedMarket ? 'Loading chart data...' : 'Select a market to view APY trends'}
                </div>
            )}
        </div>
    );
};

export default Chart;