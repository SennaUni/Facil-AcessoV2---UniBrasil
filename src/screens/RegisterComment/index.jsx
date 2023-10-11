import React from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/RegisterComment';

import { Container, Content,FormView, HeaderTitle } from './styles';

export function RegisterComment() {
  return (
    <Container>
      <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
            title='Realizar um comentário'
            subTitle='Insira as informações sobre o estabalecimento e suas acessibilidades abaixo'
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