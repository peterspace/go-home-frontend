import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import "./global.css";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { wagmiClient } from './components/config/config';
import { WagmiConfig } from 'wagmi';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <App />
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);
