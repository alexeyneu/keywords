import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MoralisProvider } from 'react-moralis';
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MoralisProvider
      serverUrl="https://6kqaf9k7pda7.usemoralis.com:2053/server"
      appId="AfdWG893nj2vEP5o0tUwoZiU38rPTchFwOHmvFAy"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </Provider>
);

reportWebVitals();
