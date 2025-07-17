# Pendle APY Tracker

A comprehensive dashboard for tracking APY (Annual Percentage Yield) trends across all active markets on the Pendle Finance protocol. Monitor real-time yields, historical performance, and market metrics across multiple blockchain networks.

## 🚀 Features

- **Real-time APY tracking** across all active Pendle markets
- **Multi-chain support** (Base, Ethereum, Arbitrum, BNB Chain)
- **Interactive charts** showing APY trends over time
- **Market metrics** including Liquidity, maturity dates, and yield statistics
- **Responsive design** optimized for desktop and mobile
- **Live data updates** with refresh functionality
- **Market comparison** with sortable and filterable views

## 📊 Dashboard Components

### Metrics Overview
- **Total Markets**: Number of active markets across selected chain
- **Average APY**: Mean yield across all markets
- **Total Liquidity**: Combined Total Liquidity across all markets

### Market List
- Browse all active markets with key metrics
- Current APY and Liquidity for each market
- Click to select and view detailed charts

### Interactive Charts
- 7-day and 30-day APY trend visualization
- Real-time trend indicators (up/down arrows)
- Market-specific maturity and Liquidity information

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Hooks
- **Charts**: Recharts for interactive visualizations
- **Icons**: Lucide React icon library
- **Styling**: Tailwind CSS for responsive design
- **API**: Pendle Finance API v2

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sheriefelhamy/PendleGraph.git
   cd PendleGraph
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── StatusBar.js        # API status and refresh controls
│   ├── ChainSelector.js    # Blockchain network selector
│   ├── ErrorAlert.js       # Error handling display
│   ├── MetricsCards.js     # Dashboard metrics cards
│   ├── MarketsList.js      # Active markets list
│   └── Chart.js            # APY trend visualization
├── utils/
│   ├── api.js              # Pendle API integration
│   └── dataUtils.js        # Data processing utilities
├── PendleAPYTracker.js     # Main application component
└── index.css               # Global styles
```

## 🔧 Configuration

### Supported Networks

| Network | Chain ID | Description |
|---------|----------|-------------|
| Base | 8453 | Base Layer 2 (Default) |
| Ethereum | 1 | Ethereum Mainnet |
| Arbitrum | 42161 | Arbitrum One |
| BNB Chain | 56 | Binance Smart Chain |

### Environment Variables

No environment variables required. The app uses public Pendle Finance API endpoints.

## 🔌 API Integration

This application integrates with the Pendle Finance API v2:

- **Markets Endpoint**: `https://api-v2.pendle.finance/core/v1/{chainId}/markets/active`
- **Market Details**: `https://api-v2.pendle.finance/core/v1/{chainId}/markets/{marketAddress}`
- **Historical Data**: `https://api-v2.pendle.finance/core/v1/{chainId}/markets/{marketAddress}/historical-data`

## 🎯 Key Features Explained

### Real-time Market Tracking
- Fetches active markets from Pendle Finance API
- Enriches market data with Liquidity, APY, and maturity information
- Updates data with refresh functionality

### Historical APY Analysis
- Displays 7-day APY trends by default
- Shows trend indicators (↗ for up, ↘ for down)
- Calculates percentage changes between periods

### Multi-chain Support
- Seamlessly switch between different blockchain networks
- Maintains separate market data for each chain
- Automatically reloads data when switching chains

## 🧪 Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Organization

- **Components**: Reusable UI components with single responsibilities
- **Utils**: Pure functions for API calls and data processing
- **State Management**: React hooks for local state management
- **Styling**: Tailwind CSS utility classes

## 🐛 Error Handling

The application includes comprehensive error handling:

- API connection failures
- Invalid market data
- Network switching errors
- Missing historical data
- Rate limiting protection

## 📱 Responsive Design

Optimized for all device sizes:
- **Desktop**: Full dashboard with side-by-side layout
- **Tablet**: Responsive grid layout
- **Mobile**: Stacked components with touch-friendly controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pendle Finance](https://pendle.finance) for providing the API
- [Recharts](https://recharts.org) for beautiful chart components
- [Lucide React](https://lucide.dev) for the icon library
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for the DeFi community**