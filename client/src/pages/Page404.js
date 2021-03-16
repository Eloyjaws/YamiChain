import React from 'react';
import { Text, Box } from '@chakra-ui/react';

export default function Page404() {
  return (
    <Box
      width="100%"
      height="calc(100vh - 300px)"
      maxHeight="calc(100vh - 120px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="blue.400" fontSize="7xl">
        404
      </Text>
    </Box>
  );
}
