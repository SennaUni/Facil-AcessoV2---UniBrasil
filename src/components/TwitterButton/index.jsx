import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function TwitterButton() {
  return (
    <Container>
      <MaterialCommunityIcons 
        name="twitter" 
        size={35} 
        color="#FFF"
      />
    </Container>
  )
}