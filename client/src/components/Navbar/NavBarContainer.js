/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

export const NavBarContainer = ({ children, ...props }) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={8}
    bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
    color={['white', 'white', 'primary.700', 'primary.700']}
    {...props}
  >
    {children}
  </Flex>
);

NavBarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
