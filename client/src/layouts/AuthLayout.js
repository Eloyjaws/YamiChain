import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/react';

function AuthLayout({ children }) {
  return (
    <Flex flex={1} direction="row">
      <p>Select your wallet</p>
      <Box>{children}</Box>
    </Flex>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthLayout;
