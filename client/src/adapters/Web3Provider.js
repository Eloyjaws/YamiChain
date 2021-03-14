/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Spinner } from '@chakra-ui/react';

import { useAppState } from '../contexts/AppContext';
import YamiChain from '../contracts/YamiChain.json';
import getWeb3 from './getWeb3';

export function Web3Provider(props) {
  const { setWeb3, setAccounts, setContract, web3, contract } = useAppState();

  async function initializeApp() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = YamiChain.networks[networkId];
      const instance = new web3.eth.Contract(
        YamiChain.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
      return <>Whoops</>;
    }
  }

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (contract) {
      console.log('Retrieved contract');
    }
  }, [contract]);

  if (web3 == null) {
    return (
      <Box
        minW="100vw"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text mb={4}>Loading Web3, accounts, and contract...</Text>
        <Spinner color="green.500" size="xl" thickness="3px" />
      </Box>
    );
  }

  const { children } = props;
  return <>{children}</>;
}

Web3Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
