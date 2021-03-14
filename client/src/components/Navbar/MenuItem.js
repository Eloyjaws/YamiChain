/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const MenuItem = ({ children, isLast, to = '/', ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isLast: PropTypes.bool.isRequired,
  to: PropTypes.string,
};
