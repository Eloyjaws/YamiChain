import React, { useContext } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import { createAuthClient } from '../utils/api';

export const AuthContext = React.createContext();

export const useAuthAPI = () => useContext(AuthContext);

function AuthLayout({ children }) {
  const AUTH_CLIENT = createAuthClient();
  return (
    <Flex flex={1} direction="row">
      <Box>
        <AuthContext.Provider value={AUTH_CLIENT}>
          {children}
        </AuthContext.Provider>
      </Box>
    </Flex>
  );
}

export default AuthLayout;
