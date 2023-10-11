import React from 'react';
import { Container, Title, Line } from './styles';

export function Divider({ text, lines, color }) {
  return (
    <Container>
      {lines ? (
        <>
          <Line color={color}/>
            <Title color={color}>{text}</Title>
          <Line color={color}/> 
        </>
      ) : (
        <Title color={color}>{text}</Title>
      )}
     
    </Container>
  )
}