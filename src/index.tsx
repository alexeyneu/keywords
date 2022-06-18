import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store/store'
import { MoralisProvider } from 'react-moralis';
import {NotificationProvider} from "web3uikit";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MoralisProvider
    serverUrl="https://delcpondbwcr.usemoralis.com:2053/server"
    appId="T8Wt7bEUXXLryy3ZVqo5CbRwNYb8NcT0Blk2Yt7y"
  >
    <Provider store={store}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Provider>
  </MoralisProvider>
);

reportWebVitals();
