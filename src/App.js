// PendleAPYTracker.js
import React, { useState, useEffect } from 'react';
import { fetchActiveMarkets, fetchMarketDetails, fetchMarketHistoricalData } from './utils/api';
import { parseHistoricalData, calculateMetrics, getTrendIndicator } from './utils/dataUtils';
import StatusBar from './components/StatusBar';
import ChainSelector from './components/ChainSelector';
import ErrorAlert from './components/ErrorAlert';
import MetricsCards from './components/MetricsCards';
import MarketsList from './components/MarketsList';
import Chart from './components/Chart';
import './index.css';

const PendleAPYTracker = () => {
  // 🧠 State
  const [markets, setMarkets] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [timeFrame, setTimeFrame] = useState('Last 7 Days');
  const [chainId, setChainId] = useState(8453); // Default to Base chain

  // 🚀 Load initial market data
  const loadMarkets = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo('Loading markets...');

    try {
      // Step 1: Fetch active markets
      const activeMarkets = await fetchActiveMarkets(chainId);

      // Step 2: Enrich each market with detailed data (TVL, APY)
      const enrichedMarkets = await Promise.all(
        activeMarkets.map(async (market) => {
          const marketAddress = market.address || market.id || market.marketAddress;
          if (!marketAddress) return market;

          const details = await fetchMarketDetails(marketAddress, chainId);
          if (details) {
            return {
              ...market,
              impliedApy: details.impliedApy ?? 0,
              tvl: details.tvl ?? details.totalValueLocked ?? 0,
              maturity: details.maturity ?? market.maturity ?? null,
              name:
                details.name ||
                details.tokenSymbol ||
                `${details.syToken?.symbol || 'SY'} / ${details.ptToken?.symbol || 'PT'}`,
            };
          }

          return market;
        })
      );

      setMarkets(enrichedMarkets);

      // Step 3: Load initial chart data
      if (enrichedMarkets.length > 0) {
        const firstMarket = enrichedMarkets[0];
        const firstMarketId = firstMarket.address || firstMarket.id || 'market-0';
        setSelectedMarket(firstMarketId);
        await loadMarketData(firstMarket);
      }

      setDebugInfo(`Loaded ${enrichedMarkets.length} markets with enriched data`);
    } catch (err) {
      setError(err.message);
      setDebugInfo(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Load data for specific market
  const loadMarketData = async (market) => {
    setError(null);
    setDebugInfo(`Loading data for ${market.name || market.symbol || 'selected market'}...`);

    try {
      const marketAddress = market.address || market.id || market.marketAddress;
      if (!marketAddress) {
        throw new Error('Market missing address');
      }

      const historicalData = await fetchMarketHistoricalData(marketAddress, chainId);
      if (!historicalData) {
        throw new Error('No historical data available for this market');
      }

      const parsedData = parseHistoricalData(historicalData, market);
      if (parsedData.length === 0) {
        throw new Error('No valid historical data points found');
      }

      const chartData = parsedData.slice(-7).map(point => ({
        date: point.date,
        timestamp: point.timestamp,
        apy: point.impliedApy
      }));

      setChartData(chartData);
      setDebugInfo(`Successfully loaded ${parsedData.length} data points`);
    } catch (err) {
      setError(err.message);
      setDebugInfo(`Error: ${err.message}`);
      setChartData([]);
    }
  };

  // 🖱 Handle market selection
  const handleMarketSelection = (marketId) => {
    setSelectedMarket(marketId);
    const market = markets.find(m => (m.address || m.id || `market-${markets.indexOf(m)}`) === marketId);
    if (market) {
      loadMarketData(market);
    }
  };

  // Calculate dashboard metrics
  const { totalMarkets, avgApy, totalTVL } = calculateMetrics(markets);
  const selectedMarketInfo = markets.find(m => (m.address || m.id || `market-${markets.indexOf(m)}`) === selectedMarket);
  const trend = getTrendIndicator(chartData);

  useEffect(() => {
    loadMarkets();
  }, [chainId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pendle Markets Dashboard</h1>
          <p className="text-gray-600 text-lg">Track APY trends across all active markets</p>
        </div>

        <ChainSelector chainId={chainId} onChainChange={setChainId} />

        {/* Status Bar */}
        <StatusBar error={error} loading={loading} onRefresh={loadMarkets} />

        {/* Error Alert */}
        <ErrorAlert error={error} />

        {/* Metrics Cards */}
        <MetricsCards
          totalMarkets={totalMarkets}
          avgApy={avgApy}
          totalTVL={totalTVL}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Markets List */}
          <MarketsList
            markets={markets}
            selectedMarket={selectedMarket}
            onMarketSelect={handleMarketSelection}
          />

          {/* Chart */}
          <Chart
            selectedMarketInfo={selectedMarketInfo}
            chartData={chartData}
            selectedMarket={selectedMarket}
            timeFrame={timeFrame}
            onTimeFrameChange={setTimeFrame}
            trend={trend}
          />
        </div>
      </div>
    </div>
  );
};

export default PendleAPYTracker;