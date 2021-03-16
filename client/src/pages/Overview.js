/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Text, Grid, GridItem, Button, Icon } from '@chakra-ui/react';
import { FaHandshake } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Card } from '../components/Card';
import { buttonStyles } from '../components/styles';

import { CompleteLoanHistory } from '../components/OverviewHelpers/CompleteLoanHistory';
// import {} from '../components/OverviewHelpers/OngoingLoans';
import { PaidLoans } from '../components/OverviewHelpers/PaidLoans';

const NoSettlements = () => {
  const history = useHistory();
  return (
    <Box
      p={4}
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={FaHandshake} color="blue.200" my={6} w={8} h={8} />
      {/* <Text mb={4} fontSize="xl" fontWeight="500">
        No Loan Repayments
      </Text> */}
      <Text mb={6} fontWeight="500">
        Log a customer's loan settlement
      </Text>
      <Button onClick={() => history.push('/payments')} {...buttonStyles}>
        Log a payment
      </Button>
    </Box>
  );
};

export default function Overview() {
  return (
    <Grid
      h="100%"
      templateRows={{ base: 'repeat(6, 1fr)', md: 'repeat(3, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={4}
    >
      <GridItem rowSpan={{ base: 2, md: 1 }} colSpan={{ base: 1, md: 5 }}>
        <Card title="Complete Loan History">
          <CompleteLoanHistory />
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 3 }}>
        <Card title="Paid Loans">
          <PaidLoans />
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 1, md: 1 }} colSpan={{ base: 1, md: 2 }}>
        <Card title="Ongoing Loans">-</Card>
      </GridItem>
      <GridItem rowSpan={{ base: 1, md: 1 }} colSpan={{ base: 1, md: 2 }}>
        <Card title="Settlement">
          <NoSettlements />
        </Card>
      </GridItem>
    </Grid>
  );
}
