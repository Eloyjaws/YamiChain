import React from "react";
import { ChakraProvider } from "@chakra-ui/react"

import { Web3Provider } from "./adapters/Web3Provider";

import "./App.css";

function App(){
    return (
      <ChakraProvider>
        <Web3Provider>
            routes. oh no!
        </Web3Provider>
      </ChakraProvider>
    );
}

export default App;
