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
      serverUrl="https://delcpondbwcr.usemoralis.com:2053/server"
      appId="T8Wt7bEUXXLryy3ZVqo5CbRwNYb8NcT0Blk2Yt7y"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </Provider>
);

reportWebVitals();
