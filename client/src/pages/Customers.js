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
      templateRows={{ base: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={4}
    >
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 3 }}>
        <Card title="List of Customers" boxProps={{ pb: 4 }}>
          <DataTable columns={columns} data={data} />
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 2 }}>
        <AddCustomer />
      </GridItem>
    </Grid>
  );
}

function AddCustomer() {
  const { handleSubmit, register, formState, reset } = useForm();
  const { yamiChainContract, accounts } = useAppState();
  function onSubmit(values) {
    const { name, id } = values;
    console.log(yamiChainContract);
    yamiChainContract.methods
      .addCustomer(name, id)
      .send({ from: accounts[0] })
      .then(console.log);
    reset();
  }
  return (
    <Card title="Add Customer" boxProps={{ p: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={8} isRequired>
          <FormLabel>Customer name</FormLabel>
          <Input ref={register} name="name" placeholder="Customer name" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Customer ID</FormLabel>
          <Input ref={register} name="id" placeholder="Customer ID" />
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
