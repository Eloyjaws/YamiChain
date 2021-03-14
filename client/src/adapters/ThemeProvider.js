import React from 'react';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function ThemeProvider({ children }) {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
