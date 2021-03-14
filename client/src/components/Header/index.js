/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

import { menuItems, footerMenuItems } from '../../utils/menu-items';
import { useAppState } from '../../contexts/AppContext';

const allMenuItems = { ...menuItems, ...footerMenuItems };

const Header = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState('');

  const { accounts, userLogout } = useAppState();
  const name = '';
  const username = `${name} ${accounts[0]}`;

  const logout = () => {
    userLogout();
    history.push('/');
  };

  useEffect(() => {
    const newTitle = allMenuItems[location.pathname]
      ? allMenuItems[location.pathname].name
      : 'Yamichain Dashboard';
    setTitle(newTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="0.625rem 1.5rem"
      bg="white"
      color="gray.700"
      minW="100%"
      shadow="sm"
      position="sticky"
      top={0}
      zIndex="2"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md" color="gray.700" fontWeight="normal">
          {title}
        </Heading>
      </Flex>

      <Flex direction="row">
        <Box display={{ sm: 'none', md: 'flex' }} alignItems="center">
          Hello,
          <Text fontSize="md" fontWeight="normal" style={{ marginLeft: 8 }}>
            {username}
          </Text>
          <Avatar
            color="white"
            backgroundColor="blue.400"
            size="sm"
            name="0 x"
            style={{ marginLeft: 8 }}
          />
          <Menu>
            <MenuButton
              _hover={{ background: 'white' }}
              style={{ marginLeft: 8 }}
              background="white"
              as={IconButton}
              aria-label="user options"
              icon={<ChevronDownIcon />}
            />
            <MenuList>
              <MenuItem onClick={logout} py={2}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box display={{ sm: 'block', md: 'none' }}>
          <Button onClick={props.onOpen} background="white">
            <svg
              fill="gray.700"
              width="16px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
