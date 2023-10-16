import React from 'react';

import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { Deatils } from '../Details';
import { useToast } from '../../hooks/toast';

import { Container, Icon, Header, Content, Address, AddressText, Buttons, IconButton } from './styles';

export function Card({item}) {

  const { addToast } = useToast();

  const isFav = false
  // const isFav = item.data.liked_by 
  //   ? item.data.liked_by.includes(dataAuth.uid)
  //   : false;

  function addFavoritos() {
    console.log('Adicionar aos Favoritos')

    // if (!dataAuth.uid) return;

    // const data = item.data.liked_by 
    //   ? [...item.data.liked_by] 
    //   : [];

    //   isFav
    //   ? data.splice(data.findIndex(item => item === dataAuth.uid), 1)
    //   : data.push(dataAuth.uid)

    // firestore()
    //   .collection('comments')
    //   .doc(item.id)
    //   .update({
    //     liked_by: data,
    //   })
    //   .then(() => {
    //     const success = {
    //       type: 'success', 
    //       title: 'Operação realizada com sucesso', 
    //       description: 'Comentário adicionado aos favoritos',
    //     }

    //     addToast(success);
    //   })
    //   .catch((err) => { 
    //     console.log(err)

    //     const error = {
    //       type: 'error', 
    //       title: 'Ocorreu um erro', 
    //       description: 'Erro ao favoritar comentário',
    //     }

    //     addToast(error);
    //     });
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
            name={item.data.rate.icon}
            size={30}
            color='#FFF'
          />
        </Icon>
      </View>
      <Header>{item.data.name} </Header>
      <Content>
        <Address>
          <FontAwesome 
            name="map-marker" 
            size={25} 
            color="#8241B8"
          />
          <AddressText>
            {item.data.address}
          </AddressText>
        </Address>

        <Buttons>
          <IconButton
            onPress={addFavoritos}
          >
            <FontAwesome 
              // name={'heart-o' || 'heart'} 
              name={isFav ? 'heart' : 'heart-o'} 
              size={24} 
              color="#8241B8"
            />
          </IconButton>
        </Buttons>
      </Content>
      <Deatils 
        data={item.data}
      />
    </Container>
  )
}