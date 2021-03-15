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

export default function ProvidersTable() {
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
        Header: 'Provider Address',
        accessor: 'address',
      },
      {
        Header: 'Provider Name',
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
        <Card title="List of Providers" boxProps={{ pb: 4 }}>
          <DataTable columns={columns} data={data} />
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 2, md: 2 }} colSpan={{ base: 1, md: 2 }}>
        <AddProvider />
      </GridItem>
    </Grid>
  );
}

function AddProvider() {
  const { handleSubmit, register, formState, reset } = useForm();

  function onSubmit(values) {
    console.log(JSON.stringify(values, null, 2));
    reset();
  }

  return (
    <Card title="Add Provider" boxProps={{ p: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Provider address</FormLabel>
          <Input ref={register} name="address" placeholder="Provider address" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Provider name</FormLabel>
          <Input ref={register} name="name" placeholder="Provider name" />
        </FormControl>
        <FormControl mt={8} isRequired>
          <FormLabel>Provider location</FormLabel>
          <Input
            ref={register}
            name="location"
            placeholder="Provider location"
          />
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
