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
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={3}>
        <Rope />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Rope />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Rope />
      </GridItem>
      <GridItem colSpan={5}>
        <Rope />
      </GridItem>
    </Grid>
  );
}
