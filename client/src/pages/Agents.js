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

export default function AgentsTable() {
  const data = React.useMemo(
    () => [
      {
        address: '0X3333',
        name: 'Saint',
        location: 'Kigali',
      },
      {
        address: '0X3333',
        name: 'Saint',
        location: 'Kigali',
      },
      {
        address: '0X3333',
        name: 'Saint',
        location: 'Kigali',
      },
      {
        address: '0X3333',
        name: 'Saint',
        location: 'Kigali',
      },
      {
        address: '0X3333',
        name: 'Saint',
        location: 'Kigali',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Agent Address',
        accessor: 'address',
      },
      {
        Header: 'Agent Name',
        accessor: 'name',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
    ],
    []
  );

  return (
    <Grid
      h="100%"
      templateRows={{ base: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={4}
    >
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 3 }}>
        <Card title="List of Agents" boxProps={{ pb: 4 }}>
          <DataTable columns={columns} data={data} />
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 2 }}>
        <AddAgent />
      </GridItem>
    </Grid>
  );
}

function AddAgent() {
  const { handleSubmit, register, formState, reset } = useForm();

  function onSubmit(values) {
    console.log(JSON.stringify(values, null, 2));
    reset();
  }

  return (
    <Card title="Add Agent" boxProps={{ p: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Agent address</FormLabel>
          <Input ref={register} name="address" placeholder="Agent address" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Agent name</FormLabel>
          <Input ref={register} name="name" placeholder="Agent name" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Agent location</FormLabel>
          <Input ref={register} name="location" placeholder="Agent location" />
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
