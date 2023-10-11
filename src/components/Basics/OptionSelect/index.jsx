import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Picture, Label } from './styles';

export function OptionSelect({ item, selectedValue, onPress }) {

  return (
    <Container 
      backGround={item.id === selectedValue?.id ? '#8241B8' : '#FFF'}
      onPress={onPress}
    >
      
      <Picture
        name={item.icon}
        size={30}
        color={item.id === selectedValue?.id ? '#FFF' : '#8241B8'}
      />

      <Label 
        color={item.id === selectedValue?.id ? '#FFF' : '#8241B8'}
      >
        {item.value}
      </Label>
    </Container>
  );
}
