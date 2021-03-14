import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '@chakra-ui/react';

export const UtilContext = createContext();

export const useUtil = () => useContext(UtilContext);

function useProvideUtil() {
  const toast = useToast();

  const showToast = (title, description, status) =>
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });

  const showErrorMessage = (title, description = '') =>
    showToast(title, description, 'error');

  const showSuccessMessage = (title, description = '') =>
    showToast(title, description, 'success');

  const showWarningMessage = (title, description = '') =>
    showToast(title, description, 'warning');

  return {
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
  };
}

export function ProvideUtil({ children }) {
  const util = useProvideUtil();

  return <UtilContext.Provider value={util}>{children}</UtilContext.Provider>;
}

ProvideUtil.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
