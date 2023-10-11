import React from 'react';

import { View, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import { Container, Image, Content, Button, Gradient, Title, Label, Value } from './styles';

const { width } = Dimensions.get('window');

export function MyProfile() {
  
  const { dataAuth } = useAuth();
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
            <Gradient colors={[ '#A88BEB', '#8241B8' ]} />
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
              onPress={() => navigate('updateUser')}
            >
              <Gradient
                colors={[ '#A88BEB', '#8241B8' ]}
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
              onPress={() => navigate('updatePassword')}
            >
              <Gradient
                colors={[ '#A88BEB', '#8241B8' ]}
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
            {dataAuth.name}
          </Title>
          <Label> 
            Email 
          </Label>
          <Value>
            {dataAuth.email}
          </Value>
          <Label> 
            Contato 
          </Label>
          <Value>
            {dataAuth.phoneNumber}
          </Value>
          <Label>
            Acessibilidade 
          </Label>
          <Value> 
            {dataAuth.accessibility} 
          </Value>
          <Label>
            Senha 
          </Label>
          <Value> 
            {dataAuth.password} 
          </Value>
        </Content>
    </Container>
  )
}