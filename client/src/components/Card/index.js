import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function Card({ children, title }) {
  return (
    <VStack height="100%" spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="500">
        {title}
      </Text>
      <Box
        p={2}
        mb={6}
        flex={1}
        height="100%"
        border="1px solid #e0e8f8"
        backgroundColor="white"
        borderRadius="4px"
      >
        {children}
      </Box>
    </VStack>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};
