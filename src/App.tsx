import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterServices from './services/RouterServices';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <RouterServices/>
      </BrowserRouter>
    </div>
  );
}

export default App;
