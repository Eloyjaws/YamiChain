/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import Logo from '../../img/yami.jpg';
import { menuItems, footerMenuItems } from '../../utils/menu-items';

import { useAppState } from '../../contexts/AppContext';

const disableServiceLink = (e) => e.preventDefault();

// const SidebarLinks = () => 'a';

const SidebarLinks = ({ menuItems, iconColor = 'teal.300' }) => (
  <>
    {Object.entries(menuItems).map(
      ([route, { name, icon, value, isDisabled, isSubMenu }]) => (
        <NavLink
          onClick={isDisabled ? disableServiceLink : null}
          exact
          activeStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          key={name}
          to={value}
        >
          <Box
            py={isSubMenu ? 2 : 3}
            pl={isSubMenu ? 39 : 1}
            pr={2}
            fontSize={!isSubMenu ? '16px' : '13px'}
            cursor={isDisabled ? 'initial' : 'pointer'}
            rounded="md"
            color="white"
            bg="transparent"
            display="flex"
            alignItems="center"
            _active={!isDisabled && { bg: 'purple.700' }}
            _focus={!isDisabled && { boxShadow: 'outline' }}
            _hover={!isDisabled && { background: 'purple.lighter' }}
            textAlign="left"
          >
            {!isSubMenu && <Icon as={icon} color={iconColor} mx={2} />}
            {name}
          </Box>
        </NavLink>
      )
    )}
  </>
);

export function MobileNavigationDrawer({ isOpen, onClose }) {
  const history = useHistory();
  const { userLogout } = useAppState();

  const logout = () => {
    userLogout();
    history.push('/');
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay width="100%" height="100%" />
      <DrawerContent height="100%">
        <DrawerCloseButton color="gray.300" />

        <DrawerHeader backgroundColor="#5e26c2" justifyContent="center">
          <img src={Logo} alt="Yamichain Logo" />
        </DrawerHeader>

        <DrawerBody backgroundColor="#5e26c2" color="#fff" overflowY="scroll">
          <SidebarLinks {...{ menuItems }} />
        </DrawerBody>

        <DrawerFooter backgroundColor="#5e26c2">
          <Flex flex={1} direction="column" justifyContent="start">
            <SidebarLinks menuItems={footerMenuItems} />
            <Menu>
              <MenuButton
                onClick={logout}
                style={{ textAlign: 'left', paddingLeft: '6.5px' }}
                background="#5e26c2"
                color="#fff"
              >
                <SmallCloseIcon
                  name="small-close"
                  size="30px"
                  color="#1dcf9f"
                  style={{ paddingRight: '3px' }}
                />
                Sign Out
              </MenuButton>
            </Menu>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const Sidebar = () => (
  <>
    <Box
      backgroundColor="#5e26c2"
      color="#fff"
      height="100vh"
      width="264px"
      minW="264px"
      direction="column"
      display={{ xs: 'none', sm: 'none', md: 'flex' }}
      flexDirection="column"
      padding={6}
      position="sticky"
      top={0}
      overflowY="scroll"
      justifyContent="start"
    >
      <Flex justifyContent="center" alignItems="center" mb={116}>
        <img src={Logo} alt="Yamichain Logo" />
      </Flex>
      <SidebarLinks {...{ menuItems }} />
      <Flex flex={1} direction="column" justifyContent="flex-end">
        <SidebarLinks iconColor="gray.400" menuItems={footerMenuItems} />
      </Flex>
    </Box>
  </>
);

export default Sidebar;
