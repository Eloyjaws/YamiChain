import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StateProvider } from './contexts/AppContext';
import { Web3Provider } from './adapters/Web3Provider';
import Router from './router';

import './App.css';

function App() {
  return (
    <ChakraProvider>
      <StateProvider>
        <Web3Provider>
          <Router />
        </Web3Provider>
      </StateProvider>
    </ChakraProvider>
  );
}

export default App;
