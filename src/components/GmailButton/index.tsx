import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function GmailButton() {
  return (
    <Container>
      <MaterialCommunityIcons 
        name="gmail" 
        size={35} 
        color="#FFF"
      />
    </Container>
  )
}