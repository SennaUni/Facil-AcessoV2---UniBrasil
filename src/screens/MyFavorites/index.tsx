import React, { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native';

import { DataType, DataTable as FilterOptions } from '../../components/DataTable/FilterOptions';
import { DataTable } from '../../components/DataTable/Comments';

import { Container, Content, Comments, CommentsText, CommentsCards } from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { listAcessibility } from '../../store/slices/acessibilitySlice';
import { listCommerce } from '../../store/slices/commerceSlice';
import { listMyFavorite } from '../../store/slices/myFavoriteSlice';

export function MyFavorites() {
  const [selectedAccess, setSelectAccesss] = useState<DataType>()
  const [selectedCommerce, setSelectCommerce] = useState<DataType>()

  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)
  const { acessibility } = useAppSelector((state) => state.acessibility)
  const { commerce } = useAppSelector((state) => state.commerce)
  const { comment } = useAppSelector((state) => state.myFavorite)

  const dados = (selectedCommerce && selectedAccess)
    ? comment.filter(item => item.estabelecimento.id === selectedCommerce.id).filter(item => item.acessibilidade.some(acessibility => acessibility.id === selectedAccess.id))
    : selectedCommerce
      ? comment.filter(item => item.estabelecimento.id === selectedCommerce.id)
      : selectedAccess
        ? comment.filter(item => item.acessibilidade.some(acessibility => acessibility.id === selectedAccess.id))
        : comment

  useFocusEffect(
    useCallback(() => {
      const GetAcessibility = () => dispatch(listAcessibility())
      const GetCommerce = () => dispatch(listCommerce())
      const GetMyComment = () => dispatch(listMyFavorite(user.id))

      if (!acessibility) GetAcessibility()
      if (!commerce) GetCommerce()
      if (!comment) GetMyComment()
    }, [acessibility, commerce, comment, user])
  )
  return (
    <Container
      vertical
      showsVerticalScrollIndicator={false}
    >
      <Content colors={['#6C33A3', '#8241B8']}>
        <FilterOptions
          data={acessibility}
          header="Acessibilidades"
          callBack={(item: DataType) => setSelectAccesss(item)}
        />

        <FilterOptions
          data={commerce}
          header="Estabelecimento"
          callBack={(item: DataType) => setSelectCommerce(item)}
        />

        <Comments>
          <CommentsText>Comentarios Favoritos</CommentsText>
        </Comments>

        <CommentsCards>
          <DataTable
            data={dados}
          />
        </CommentsCards>
      </Content>
    </Container>
  )
}
