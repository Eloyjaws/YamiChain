import React from 'react';
import { Box, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import { Card } from '../components/Card';

const Rope = () => (
  <Card title="Loans">
    <Box
      p={4}
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text mb={4} fontSize="xl" fontWeight="500">
        No Loan Repayments
      </Text>
      <Text mb={6} fontWeight="500">
        Log a customer's loan repayment
      </Text>
      <Button
        borderRadius="4"
        backgroundColor="#f4f8fc"
        colorScheme="blue"
        color="blue.400"
        py={5}
        variant="ghost"
      >
        Log a repayment
      </Button>
    </Box>
  </Card>
);

export default function Overview() {
  return (
    <Grid
      h="100%"
      templateRows={{ base: 'repeat(6, 1fr)', md: 'repeat(3, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={4}
    >
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 3 }}>
        <Rope />
      </GridItem>
      <GridItem rowSpan={{ base: 1, md: 1 }} colSpan={{ base: 1, md: 2 }}>
        <Rope />
      </GridItem>
      <GridItem rowSpan={{ base: 1, md: 1 }} colSpan={{ base: 1, md: 2 }}>
        <Rope />
      </GridItem>
      <GridItem rowSpan={{ base: 2, md: 1 }} colSpan={{ base: 1, md: 5 }}>
        <Rope />
      </GridItem>
    </Grid>
  );
}
