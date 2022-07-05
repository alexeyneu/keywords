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
       serverUrl="https://zudw76gwxkos.usemoralis.com:2053/server"
       appId="MkHcQ642RUsmJ8H29mH0hA1CM4nnPVmR75JyjQAY"
  >
    <Provider store={store}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Provider>
  </MoralisProvider>
);

reportWebVitals();
