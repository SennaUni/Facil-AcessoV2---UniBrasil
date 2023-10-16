import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';

import { Container } from './styles';

export function LinkedinButton() {
  return (
    <Container>
      <FontAwesome5 
        name="linkedin-in" 
        size={35} 
        color="#FFF"
      />
    </Container>
  )
}