import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Content, Icon, Text } from './styles';

type DefaltTableParams = { 
  id: number
  icon: string
  descricao: string
}

export function DataTable({ data }) {
  return (
    <Container>
      { data.map((item: DefaltTableParams, index: number) => (
          <Content
            key={index}
          >
            <Icon
               colors={[ '#A88BEB', '#8241B8' ]}
            >
              <FontAwesome
                name={item.icon as any}
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