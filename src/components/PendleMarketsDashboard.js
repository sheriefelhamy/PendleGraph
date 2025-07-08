// src/components/PendleMarketsDashboard.js
import React, { useState, useEffect } from 'react';
import { useMarkets } from '../hooks/useMarkets';
import { RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import StatsOverview from './StatsOverview';
import MarketsList from './MarketsList';
import APYChart from './APYChart';

const PendleMarketsDashboard = () => {
    const { markets, loading, error, refreshMarkets, chainId } = useMarkets();
    const [selectedMarket, setSelectedMarket] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Auto-select first market when markets load
    useEffect(() => {
        if (markets.length > 0 && !selectedMarket) {
            setSelectedMarket(markets[0]);
        }
    }, [markets, selectedMarket]);

    // Update last updated time when markets change
    useEffect(() => {
        if (markets.length > 0) {
            setLastUpdated(new Date());
        }
    }, [markets]);

    // Handle manual refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshMarkets();
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Refresh failed:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Handle market selection
    const handleMarketSelect = (market) => {
        setSelectedMarket(market);
    };

    // Error state
    if (error && markets.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md w-full">
                    <div className="text-center">
                        <WifiOff className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Connection Error
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Unable to connect to Pendle API. Please check your internet connection and try again.
                        </p>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                        >
                            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                            <span>{isRefreshing ? 'Retrying...' : 'Try Again'}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading && markets.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                <Header />

                {/* Status Bar */}
                <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${error ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                <span className="text-sm font-medium text-gray-700">
                                    {error ? 'API Issues - Using Fallback Data' : 'Connected to Pendle API'}
                                </span>
                            </div>
                            {lastUpdated && (
                                <div className="text-sm text-gray-500">
                                    Last updated: {lastUpdated.toLocaleTimeString()}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                                Chain: {chainId === 8453 ? 'Base' : 'Ethereum'}
                            </span>
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing || loading}
                                className="p-2 text-gray-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Refresh data"
                            >
                                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-3 flex items-center space-x-2 text-amber-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                </div>

                {/* Stats Overview */}
                <StatsOverview markets={markets} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <MarketsList
                        markets={markets}
                        selectedMarket={selectedMarket}
                        onMarketSelect={handleMarketSelect}
                        loading={loading}
                    />
                    <APYChart selectedMarket={selectedMarket} />
                </div>

                {/* Markets Summary */}
                {markets.length > 0 && (
                    <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Market Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-500">Total Markets</p>
                                <p className="text-2xl font-bold text-gray-900">{markets.length}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-500">Avg APY</p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {(markets.reduce((sum, m) => sum + m.currentAPY, 0) / markets.length).toFixed(2)}%
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-500">Total TVL</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${(markets.reduce((sum, m) => sum + m.tvl, 0) / 1000000).toFixed(1)}M
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
};

export default PendleMarketsDashboard;