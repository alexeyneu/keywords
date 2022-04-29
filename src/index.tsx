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
      serverUrl="https://nvrsou2ozsgs.usemoralis.com:2053/server"
      appId="s2y4TSqAJQTTl5OlLVd9mow3dNi8jcnm7lxCbFYO"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </Provider>
);

reportWebVitals();
