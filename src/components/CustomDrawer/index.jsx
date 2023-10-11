import React from 'react';

import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Header, HeaderImage, HeaderText, DrawerOptions, Footer, FooterButtons, FooterText } from './styles';

export function CustomDrawer( props ) {

  const { dataAuth, signOut } = useAuth();
  const { navigate } = useNavigation();
  const { addToast } = useToast();
  

  return (
     <Container colors={[ '#8241B8', '#6C33A3' ]}>
      <DrawerContentScrollView 
        // contentContainerStyle={{}}
        {...props} 
      >
        <Header>
          <View>
            <HeaderImage
              
            />
            <HeaderText>
              { dataAuth.name ? 'Olá, ' + dataAuth.name  : 'Bem vindo, Visitante'}
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
            signOut();
            
            const success = {
              type: 'success', 
              title: 'LogOut com sucesso', 
              description: 'Até a próxima',
            }
      
            addToast(success); 
            navigate('principal');
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
};

const styles = StyleSheet.create({
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#000',
  },
});