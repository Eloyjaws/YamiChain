/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ProvidersTable } from './Providers';
import { DataTable } from '../components/Table';
import { Card } from '../components/Card';
import { buttonStyles } from '../components/styles';
import { useAppState } from '../contexts/AppContext';

export default function CustomersTable() {
  const { yamiChainContract, accounts, web3 } = useAppState();
  const [customers, setCustomers] = React.useState([]);

  const data = React.useMemo(() => customers, [customers]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Name',
        accessor: 'name',
      },
      {
        Header: 'Customer ID',
        accessor: 'id',
      },
    ],
    []
  );

  if (yamiChainContract)
    yamiChainContract.events.NewCustomerCreated().on('data', (res) => {
      // // eslint-disable-next-line prettier/prettier
      const name = res.returnValues[0];
      const id = res.returnValues[1];
      const parsed = { name, id };
      setCustomers([...customers, parsed]);
    });

  React.useEffect(() => {
    if (yamiChainContract) {
      yamiChainContract.methods
        .getAllCustomers()
        .call()
        .then((res) => {
          const parsed = res
            .map((x) => {
              const [name, id] = x;
              // eslint-disable-next-line prettier/prettier
            return ({ name, id });
            })
            .filter((x) => x.id !== '0' || x.name !== '');
          setCustomers(parsed);
        });
    }
  }, [yamiChainContract]);

  return (
    <Grid
      h="100%"
      templateRows={{ base: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
      gap={4}
    >
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 2 }}>
        <AddSettlement />
      </GridItem>
      <GridItem rowSpan={{ base: 1, md: 1 }} colSpan={{ base: 1, md: 2 }}>
        <Card title="List of Customers" boxProps={{ pb: 4 }}>
          <DataTable columns={columns} data={data} />
        </Card>
      </GridItem>
      <GridItem
        display={{ base: 'none', md: 'flex' }}
        rowSpan={{ base: 2, md: 1 }}
        colSpan={{ base: 1, md: 2 }}
      >
        <ProvidersTable />
      </GridItem>
    </Grid>
  );
}

function AddSettlement() {
  const { handleSubmit, register, formState, reset } = useForm();
  const { yamiChainContract, accounts, web3 } = useAppState();

  const toUInt = (num) => web3.eth.abi.encodeParameter('uint', num);
  const toUInt256 = (num) => web3.eth.abi.encodeParameter('uint256', num);

  function onSubmit(values) {
    const { loanId, providerId, amount } = values;

    yamiChainContract.methods
      .paySettlement(toUInt(loanId), toUInt(providerId), toUInt256(amount))
      .send({ from: accounts[0] })
      .then(console.log);
    reset();
  }
  return (
    <Card title="Add Settlement" boxProps={{ p: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={8} isRequired>
          <FormLabel>Loan ID</FormLabel>
          <Input ref={register} name="loanId" placeholder="Loan ID" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Provider ID</FormLabel>
          <Input ref={register} name="providerId" placeholder="Provider ID" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Amount</FormLabel>
          <Input ref={register} name="amount" placeholder="Amount" />
        </FormControl>
        <Button
          {...buttonStyles}
          mt={8}
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}
