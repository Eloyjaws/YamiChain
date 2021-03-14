import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../utils/useLocalStorage';

const appContext = createContext();

export function Provider({ children }) {
  // eslint-disable-next-line no-use-before-define
  const value = useProvideAppState();
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function useAppState() {
  return useContext(appContext);
}

function useProvideAppState() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [persistedState, setPersistedState] = useLocalStorage('persistor', {});

  function userLogout() {
    setAccounts(null);
  }

  return {
    persistedState,
    setPersistedState,

    web3,
    accounts,
    contract,

    setWeb3,
    setAccounts,
    setContract,

    userLogout,
  };
}
