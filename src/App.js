import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import StatsOverview from './components/StatsOverview';
import MarketsList from './components/MarketsList';
import APYChart from './components/APYChart';
import useMarkets from './hooks/useMarkets';

const App = () => {
  const { markets, loading, selectedMarket, setSelectedMarket } = useMarkets();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsOverview markets={markets} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MarketsList
            markets={markets}
            selectedMarket={selectedMarket}
            onMarketSelect={setSelectedMarket}
          />
          <APYChart selectedMarket={selectedMarket} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;