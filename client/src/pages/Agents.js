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

export default function AgentsTable() {
  const { yamiChainContract, accounts, web3 } = useAppState();
  const [agents, setAgents] = React.useState([]);
  const [providerId, setProviderId] = React.useState(null);
  if (yamiChainContract) {
    yamiChainContract.methods
      .getProviderId(accounts[0])
      .call()
      .then((res) =>
        setProviderId(web3.eth.abi.encodeParameter('uint256', res))
      );
  }
  const data = React.useMemo(() => agents, [agents]);
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
        Header: 'Agent ID',
        accessor: 'id',
      },
    ],
    []
  );

  if (yamiChainContract)
    yamiChainContract.events.NewAgentCreated().on('data', (res) => {
      // const [address, name, location] = res.returnValues;
      // // eslint-disable-next-line prettier/prettier
      const address = `${res.returnValues[0].slice(0, 16)}...`;
      const name = res.returnValues[2];
      const id = res.returnValues[3];
      const parsed = { address, name, id };
      setAgents([...agents, parsed]);
    });

  React.useEffect(() => {
    if (yamiChainContract && providerId !== null) {
      yamiChainContract.methods
        .getAgentsByProvider(providerId)
        .call()
        .then((res) => {
          const parsed = res
            .map((x) => {
              const [name, id, address] = x;
              // eslint-disable-next-line prettier/prettier
            return ({ address: `${address.slice(0, 16)  }...`, name, id });
            })
            .filter((x) => x.id !== '0' || x.name !== '');
          setAgents(parsed);
        });
    }
  }, [yamiChainContract, providerId]);

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
        <AddAgent providerId={providerId} />
      </GridItem>
    </Grid>
  );
}

function AddAgent({ providerId }) {
  const { handleSubmit, register, formState, reset } = useForm();
  const { yamiChainContract, accounts } = useAppState();
  function onSubmit(values) {
    const { address, name, id } = values;
    console.log(yamiChainContract);
    yamiChainContract.methods
      .addAgent(providerId, name, id, address)
      .send({ from: accounts[0] })
      .then(console.log);
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
          <FormLabel>Agent ID</FormLabel>
          <Input ref={register} name="id" placeholder="Agent ID" />
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
