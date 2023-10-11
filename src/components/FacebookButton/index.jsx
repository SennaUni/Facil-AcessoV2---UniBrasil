import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function FacebookButton() {
  return (
    <Container>
      <MaterialCommunityIcons 
        name="facebook" 
        size={35} 
        color="#FFF"
      />
    </Container>
  )
}