import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { MenuIcon, CloseIcon } from 'react-icons';

export const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <MenuIcon />}
  </Box>
);

MenuToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
