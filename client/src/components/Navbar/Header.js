import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { MenuToggle } from './MenuToggle';
import { MenuItem } from './MenuItem';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/how">How It Works</MenuItem>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      </Stack>
    </Box>
  );
};
