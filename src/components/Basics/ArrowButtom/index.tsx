import React from 'react';

import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Container, Gradient } from './styles';

// export type ArrowButtonParams = {
//   gradient: string[]
//   loading?: boolean
//   reverse?: boolean
// }

export function ArrowButtom({ loading = false, gradient, reverse = false, ...rest }) {
  return (
    <>
      { loading ? (
        <Container {...rest} disabled={true}>
          <Gradient loading={loading} colors={gradient}>
            <ActivityIndicator
              size='small'
              color='#FFF'
            />
          </Gradient>
        </Container>
      ) : (
        <Container {...rest} >
          <Gradient loading={loading} colors={gradient}>
            <Feather
              name={reverse ? 'arrow-left' : 'arrow-right'}
              size={40}
              color={'#FFF'}
            />
          </Gradient>
        </Container>
      )}
    </>
  );
}