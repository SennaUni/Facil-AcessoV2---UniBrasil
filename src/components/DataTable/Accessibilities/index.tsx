import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Content, Icon, Text } from './styles';

export function DataTable({ data }) {
  return (
    <Container>
      { data.map((item, index) => (
          <Content
            key={index}
          >
            <Icon
               colors={[ '#A88BEB', '#8241B8' ]}
            >
              <FontAwesome
                name={item.icon}
                size={30}
                color='#FFF'
              />
            </Icon>
            <Text>{item.descricao}</Text>
          </Content>
        ))}
    </Container>
  )
}