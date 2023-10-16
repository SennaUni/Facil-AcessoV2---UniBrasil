import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/UpdatePassword';

import { Container, Content, FormView, HeaderTitle } from './styles';

export function UpdatePassword() {
  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
              title='Atualizar minha senha'
              subTitle='Insira sua senha atual e nova nos campos abaixo'
              color='#FFF'
          />
        </HeaderTitle>
        <FormView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Form />
          </TouchableWithoutFeedback>
        </FormView>
      </Content>
    </Container>
  );
}