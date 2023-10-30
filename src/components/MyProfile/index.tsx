import React from 'react';

import { View, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import { useAppSelector } from '../../hooks/redux';

import { Container, Image, Content, Button, Gradient, Title, Label, Value } from './styles';

import { DataTable } from '../DataTable/Accessibilities';

const { width } = Dimensions.get('window');

export function MyProfile() {
  const { user } = useAppSelector((state) => state.auth)

  const { navigate } = useNavigation();

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: -100,
          left: 30,
        }}
      >
        <Image>
          <Gradient colors={['#A88BEB', '#8241B8']} />
        </Image>
      </View>

      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 160,
        }}
      >
        <Button
          onPress={() => navigate('updateUser' as never)}
        >
          <Gradient
            colors={['#A88BEB', '#8241B8']}
          >
            <FontAwesome
              name='edit'
              size={30}
              color={'#FFF'}
            />
          </Gradient>
        </Button>
      </View>

      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 100,
        }}
      >
        <Button
          onPress={() => navigate('updatePassword' as never)}
        >
          <Gradient
            colors={['#A88BEB', '#8241B8']}
          >
            <FontAwesome
              name='unlock'
              size={30}
              color={'#FFF'}
            />
          </Gradient>
        </Button>
      </View>

      <Content>
        <Title>
          {user.login}
        </Title>
        <Label>
          Email
        </Label>
        <Value>
          {user.email}
        </Value>
        <Label>
          Contato
        </Label>
        <Value>
          {user.telefone}
        </Value>
        <Label>
          Acessibilidade
        </Label>
        <Value>
          <DataTable
            data={user.acessibilidades}
          />
        </Value>
      </Content>
    </Container>
  )
}