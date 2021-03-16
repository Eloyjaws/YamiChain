import {
  FaArchive,
  FaUserCircle,
  FaCashRegister,
  FaMoneyBill,
  FaHandshake,
  FaHandHoldingUsd,
  FaCog,
} from 'react-icons/fa';

export const menuItems = {
  '/overview': {
    name: 'Overview',
    value: '/overview',
    isSubMenu: false,
    icon: FaArchive,
  },
  '/loans': {
    name: 'Loans',
    value: '/loans',
    isSubMenu: false,
    icon: FaMoneyBill,
  },
  '/payments': {
    name: 'Settlements',
    value: '/payments',
    isSubMenu: false,
    icon: FaHandshake,
  },
  '/customers': {
    name: 'Customers',
    value: '/customers',
    isSubMenu: false,
    icon: FaUserCircle,
  },
  '/agents': {
    name: 'Agents',
    value: '/agents',
    isSubMenu: false,
    icon: FaCashRegister,
  },
  '/providers': {
    name: 'Providers',
    value: '/providers',
    isSubMenu: false,
    icon: FaHandHoldingUsd,
  },
};

export const footerMenuItems = {
  '/settings': {
    name: 'Settings',
    value: '/settings',
    icon: FaCog,
  },
};
