/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { DataTable } from '../Table';
import { buttonStyles } from '../styles';
import { useAppState } from '../../contexts/AppContext';

export function CompleteLoanHistory() {
  const [customerId, setCustomerId] = React.useState(null);
  const { handleSubmit, register, formState } = useForm();
  function onSubmit({ id }) {
    setCustomerId(id);
  }
  return (
    <VStack
      p={4}
      alignItems="start"
      justifyContent="center"
      position="relative"
      spacing="24px"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box alignItems="center" display="flex" align="stretch">
          <FormControl display="flex" mt={8} isRequired>
            <FormLabel display="flex" alignItems="center" p={0} m={0}>
              Enter Customer Id
            </FormLabel>
            <Input
              autoComplete="off"
              flex={1}
              ref={register}
              name="id"
              borderRadius="4px"
              width="320px"
              mx={4}
              placeholder="Customer Id..."
            />
          </FormControl>
          <Button
            {...buttonStyles}
            mt={8}
            isLoading={formState.isSubmitting}
            type="submit"
            rightIcon={<Search2Icon />}
          >
            Search
          </Button>
        </Box>
      </form>
      <CompleteLoanHistoryTable customerId={customerId} />
    </VStack>
  );
}

// eslint-disable-next-line react/prop-types
export function CompleteLoanHistoryTable({ customerId }) {
  const [completeLoanHistory, setCompleteLoanHistory] = React.useState([]);
  const data = React.useMemo(() => completeLoanHistory, [completeLoanHistory]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Total Amount',
        accessor: 'totalAmount',
      },
      {
        Header: 'Total to Pay',
        accessor: 'totalToPay',
      },
      {
        Header: 'Amount Reimbursed',
        accessor: 'amountReimbursed',
      },
      {
        Header: 'Contracted On',
        accessor: 'contractedOn',
      },
      {
        Header: 'Expected Reimbursement Date',
        accessor: 'expectedReimbursementDate',
      },
      {
        Header: 'Last Reimbursement Date',
        accessor: 'lastReimbursementDate',
      },
    ],
    []
  );

  const { yamiChainContract, web3 } = useAppState();

  React.useEffect(() => {
    const toUInt = (num) => web3.eth.abi.encodeParameter('uint', num);
    if (customerId == null) return;
    if (yamiChainContract)
      yamiChainContract.methods
        .getCompleteLoanHistory(toUInt(customerId))
        .call()
        .then(console.log);
    // .then((res) => {
    //   const parsed = res.map((x) => {
    //     const [
    //       totalAmount,
    //       totalToPay,
    //       amountReimbursed,
    //       contractedOn,
    //       expectedReimbursementDate,
    //       lastReimbursementDate,
    //     ] = x;

    //     // eslint-disable-next-line prettier/prettier
    //     return ({
    //       totalAmount,
    //       totalToPay,
    //       amountReimbursed,
    //       contractedOn,
    //       expectedReimbursementDate,
    //       lastReimbursementDate,
    //       // eslint-disable-next-line prettier/prettier
    //     });
    //   });
    //   setCompleteLoanHistory(parsed);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yamiChainContract, customerId]);

  return <DataTable columns={columns} data={data} />;
}
