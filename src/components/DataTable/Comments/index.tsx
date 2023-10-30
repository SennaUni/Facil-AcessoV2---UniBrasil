import React from 'react';

import { FlatList } from 'react-native';

import { Card } from '../../Card';

import { Container, EmpytComment } from './styles';

export type DataTableParams = {
  data: any
}

export function DataTable({ data }: DataTableParams) {
  function Empty() {
    return (
      <EmpytComment>
        Nenhum comentário encontrado
      </EmpytComment>
    )
  }

  return (
    <Container>
      <FlatList 
        data={data}
        renderItem={({item}) => <Card item={item}/>}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => Empty()}
        showsVerticalScrollIndicator={false}
        />
    </Container>
  )
}