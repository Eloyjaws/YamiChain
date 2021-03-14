import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function Card({ children }) {
  const backgroundColor = useColorModeValue('white', 'whiteAlpha.100');
  return (
    <Box width="100%" p={6} mb={6} boxShadow="md" {...{ backgroundColor }}>
      {children}
    </Box>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
