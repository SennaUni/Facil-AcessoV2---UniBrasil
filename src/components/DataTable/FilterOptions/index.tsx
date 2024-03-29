import React from 'react';

import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Container, Header, Content, Icon, Label } from './styles';

export type DataTableParams = {
  data: DataType[]
  header: string
  callBack: (item: DataType) => void
  color?: string
}

export type DataType = {
  id: number
  descricao: string
  icon: string
}

export function DataTable({ data, header, callBack, color = '#FFF' }: DataTableParams) {

  function loop({ item }) {
    return(
      <Content>
        <TouchableOpacity
          onPress={() => callBack(item)}
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
        </TouchableOpacity>
        <Label
          color={color}
        >
          {item.descricao}
        </Label>
      </Content>
    )
  }

  return (
    <Container>
      <Header
        color={color}
      >
        {header}
      </Header>
      <FlatList 
          data={data}
          renderItem={loop}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          // ListEmptyComponent={() => console.log('vazio')}
          style={{ paddingHorizontal: 5 }}
        />
    </Container>
  )
}