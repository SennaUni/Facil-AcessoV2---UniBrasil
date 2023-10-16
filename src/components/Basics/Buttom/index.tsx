import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Button, Title } from './styles';

export function Buttom({ title, loading = false, ...rest }) {
  return (
    <Container colors={[ '#6C33A3', '#8241B8' ]}>
      { loading ? (
        <Button {...rest} loading={true} disabled={true}>
          <ActivityIndicator
            size='small'
            color='#FFF'
          />
          <Title>Loading</Title>
        </Button>
      ) : (
        <Button {...rest} >
          <Title>{title}</Title>
        </Button>
      )}
    </Container>
  );
}