import React, { useState } from 'react';

import { likeCommentApiRequest } from '../../api/commentRequests';

import { listMyComment } from '../../store/slices/myCommentSlice';
import { listMyFavorite } from '../../store/slices/myFavoriteSlice';
import { listComment } from '../../store/slices/commentSlice';

import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Deatils } from '../Details';
import { useToast } from '../../hooks/toast';

import { Container, Icon, Header, Content, Address, AddressText, Buttons, IconButton } from './styles';

export function Card({item}) {
  const [loading, setLoading] = useState<boolean>(false)

  const rates = [
    { icon: 'meh-o', value: 'Recomendo' },
    { icon: 'smile-o', value: 'Super recomendo' },
    { icon: 'frown-o', value: 'Não recomendo' },
  ]

  const { user } = useAppSelector((state) => state.auth)

  const { addToast } = useToast()
  const dispatch = useAppDispatch()

  async function addFavoritos(item: any) {
    setLoading(true)

    try {
      await likeCommentApiRequest({
        idComentario: item.id,
        idUsuario: user.id,
        curtido: !item.curtido
      })

     dispatch(listComment(user.id))
     dispatch(listMyComment(user.id))
     dispatch(listMyFavorite(user.id))
    } catch (err) {
      addToast({
        title: 'Ops, ocorreu um erro!',
        description: err.message,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      style={{
        shadowColor: '#8241B8',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0},
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View 
        style={{
          position : 'absolute', 
          top : -20, 
          left : 15,
        }}
      >
        <Icon colors={[ '#A88BEB', '#8241B8' ]}>
          <FontAwesome
            name={rates[item.nivelSatisfacao - 1].icon as any}
            size={30}
            color='#FFF'
          />
        </Icon>
      </View>
      <Header>{item.nomeEstabelecimento}</Header>
      <Content>
        <Address>
          <FontAwesome 
            name="map-marker" 
            size={25} 
            color="#8241B8"
          />
          <AddressText>
            {item.bairro} - {item.estado}
          </AddressText>
        </Address>

        <Buttons>
          <IconButton
            onPress={() => !loading && addFavoritos(item)}
          >
            <FontAwesome 
              name={item.curtido as boolean ? 'heart' : 'heart-o'} 
              size={24} 
              color="#8241B8"
            />
          </IconButton>
        </Buttons>
      </Content>

      <Deatils 
        data={item}
      />
    </Container>
  )
}