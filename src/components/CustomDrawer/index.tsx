import React from 'react';

import { View } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';

import { logoff } from '../../store/slices/authSlice'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { useToast } from '../../hooks/toast';

import { Container, Header, HeaderImage, HeaderText, DrawerOptions, Footer, FooterButtons, FooterText } from './styles';

export function CustomDrawer( props: any ) {
  const user = useAppSelector((state) => state.auth && state.auth.user)

  const { addToast } = useToast()
  const dispatch = useAppDispatch()

  return (
     <Container colors={[ '#8241B8', '#6C33A3' ]}>
      <DrawerContentScrollView 
        {...props} 
      >
        <Header>
          <View>
            <HeaderImage
              
            />
            <HeaderText>
              { user ? 'Olá, ' + user.login  : 'Bem vindo, Visitante'}
            </HeaderText>
          </View>
        </Header>
        <DrawerOptions>
          <DrawerItemList 
            {...props} 
          />
        </DrawerOptions>
      </DrawerContentScrollView>
      <Footer>
        <FooterButtons>
          <FontAwesome 
            name="gear" 
            size={22} 
            color='#FFF' 
            style={{ marginRight: 10 }}
          />
          <FooterText>Opções</FooterText>
        </FooterButtons>
        <FooterButtons
          onPress={() => {
            dispatch(logoff())

            addToast({
              type: 'success', 
              title: 'LogOut com sucesso', 
              description: 'Até a próxima',
            })
          }}
        >
          <MaterialIcons 
            name="logout" 
            size={22} 
            color='#FFF' 
            style={{ marginRight: 10 }} 
          />
          <FooterText>Sair</FooterText>
        </FooterButtons>
      </Footer>
    </Container>
  )
}