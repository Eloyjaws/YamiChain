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
  '/agents': {
    name: 'Agents',
    value: '/agents',
    isSubMenu: false,
    icon: FaCashRegister,
  },
  '/customers': {
    name: 'Customers',
    value: '/customers',
    isSubMenu: false,
    icon: FaUserCircle,
  },
  '/loans': {
    name: 'Loans disbursed',
    value: '/loans',
    isSubMenu: false,
    icon: FaMoneyBill,
  },
  '/payments': {
    name: 'Repayments',
    value: '/payments',
    isSubMenu: false,
    icon: FaHandshake,
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
