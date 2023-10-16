import React from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/UpdateUser';

import { Container, Content, FormView, HeaderTitle } from './styles';

export function UpdateUser() {
  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
             title='Atualizar meu perfil'
             subTitle='Mantenha seus dados pessoais atualizados'
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