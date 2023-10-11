import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function GithubButton() {
  return (
    <Container>
      <MaterialCommunityIcons 
        name="github" 
        size={35} 
        color="#FFF"
      />
    </Container>
  )
}