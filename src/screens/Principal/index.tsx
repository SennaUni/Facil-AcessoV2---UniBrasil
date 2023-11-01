import React, { useState, useCallback, useEffect } from 'react';

import { TouchableOpacity, StatusBar } from 'react-native';

import { useToast } from '../../hooks/toast'; 
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { listAcessibility } from '../../store/slices/acessibilitySlice';
import { listCommerce } from '../../store/slices/commerceSlice';
import { listComment } from '../../store/slices/commentSlice';

import { FontAwesome } from '@expo/vector-icons';

import { DataType, DataTable as FilterOptions } from '../../components/DataTable/FilterOptions';
import { DataTable } from '../../components/DataTable/Comments';

import { Container, Content, Comments, CommentsText, Icon, CommentsCards } from './styles';

export function Principal() {
  const [selectedAccess, setSelectAccesss] = useState<DataType>()
  const [selectedCommerce, setSelectCommerce] = useState<DataType>()

  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const { addToast } = useToast()

  const { user, sucess } = useAppSelector((state) => state.auth)
  const { acessibility } = useAppSelector((state) => state.acessibility)
  const { commerce } = useAppSelector((state) => state.commerce)
  const { comment } = useAppSelector((state) => state.comment)

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
      const GetComment = () => dispatch(listComment(user.id))

      if (!acessibility) GetAcessibility()
      if (!commerce) GetCommerce()
      if (!comment) GetComment()
    }, [acessibility, commerce, comment])
  )

  useEffect(() => {
    if (sucess) {
      addToast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem vindo ao fácil acesso',
        type: 'success'
      })
    }
  }, [sucess])

  return (
    <Container
      vertical
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />

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
          <CommentsText>Comentarios</CommentsText>
          {user &&
            <TouchableOpacity
              onPress={() => navigate('registerComment' as never)}
            >
              <Icon colors={['#A88BEB', '#8241B8']}>
                <FontAwesome
                  name='plus'
                  size={30}
                  color='#FFF'
                />
              </Icon>
            </TouchableOpacity>
          }
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
