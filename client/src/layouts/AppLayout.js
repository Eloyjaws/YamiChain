import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, useDisclosure } from '@chakra-ui/react';

import Header from '../components/Header';
import Sidebar, { MobileNavigationDrawer } from '../components/Sidebar';

function AppLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flex={1} direction="row">
      <MobileNavigationDrawer {...{ isOpen, onClose }} />
      <Sidebar />
      <Flex flex={1} direction="column" background="#f3f4f8">
        <Header {...{ onOpen }} />
        <Box mt={8} mb={8} padding="0 1.5rem" maxWidth="100vw">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
