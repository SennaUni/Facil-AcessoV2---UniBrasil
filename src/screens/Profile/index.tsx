import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import { MyProfile } from '../../components/MyProfile';

import { Container, Content, DataView, HeaderTitle } from './styles';

export function Profile() {
  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
            title='Meu perfil'
            color='#EDF2FA'
          />
        </HeaderTitle>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <DataView>
              <MyProfile />
            </DataView>
        </TouchableWithoutFeedback>
      </Content>
    </Container>
  );
}