import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Flex } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { didCatchError: false };

  componentDidCatch(error, info) {
    this.setState({ didCatchError: true });
    console.error(error, info);
  }

  render() {
    const { didCatchError } = this.state;
    const { children } = this.props;

    if (!didCatchError) return children;

    return (
      <Flex
        direction="column"
        justifyContent="center"
        minH="100%"
        alignItems="center"
      >
        <Icon name="warning" size="32px" m={5} color="red.500" />
        <span>Oops! Something went wrong!</span>
      </Flex>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
