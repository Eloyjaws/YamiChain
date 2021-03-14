import React, { useContext } from 'react';
import { Flex, Box, useDisclosure } from '@chakra-ui/core';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { MobileNavigationDrawer } from '../components/Sidebar';

import { createAPIClient } from '../utils/api';
import { useAuth } from '../utils/useAuth';
import { useUtil } from '../utils/useUtil';

const AppContext = React.createContext();

function AppLayout({ children }) {

  const { token, userLogout } = useAuth();
  const { showWarningMessage } = useUtil();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let APP_CLIENT = createAPIClient(token, destroyClient);

  function destroyClient() {
    showWarningMessage('Session expired.', 'Please login to continue');
    userLogout();
    APP_CLIENT = null;
  };

  return (
    <Flex flex={1} direction="row">
      <MobileNavigationDrawer {...{ isOpen, onClose }} />
      <Sidebar />
      <Flex flex={1} direction="column" background="#f3f4f8">
        <Header {...{ onOpen }} />
        <Box mt={8} mb={8} padding="0 1.5rem" maxWidth="100vw">
          <AppContext.Provider value={APP_CLIENT}>
            {children}
          </AppContext.Provider>
        </Box>
      </Flex>
    </Flex>
  );
}

export const useAPI = () => {
  return useContext(AppContext);
};

export default AppLayout;