import React from 'react';
import { Provider as StateProvider } from './contexts/AppContext';
import { Web3Provider } from './adapters/Web3Provider';
import { ThemeProvider } from './adapters/ThemeProvider';
import Router from './router';

import './App.css';

function App() {
  return (
    <StateProvider>
      <Web3Provider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </Web3Provider>
    </StateProvider>
  );
}

export default App;
