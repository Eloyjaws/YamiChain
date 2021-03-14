/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NavBarContainer } from './NavBarContainer';
import { Header } from './Header';

export const NavBar = (props) => (
  <NavBarContainer {...props}>
    <Header />
  </NavBarContainer>
);
