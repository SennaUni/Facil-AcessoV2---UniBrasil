import React from 'react';

import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Forms/ForgotPassword';

import { Container, Content, FormView, HeaderTitle } from './styles';

export function ForgotPassword() {
  return (
    <Container>
       <Content colors={[ '#6C33A3', '#8241B8' ]}>
        <HeaderTitle>
          <Header 
             title='Esqueci minha senha'
             subTitle='Para recuperar sua senha defina seu e-mail abaixo'
             color='#EDF2FA'
          />
        </HeaderTitle>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
            <FormView>
              <Form />
            </FormView>
          {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
      </Content>
    </Container>
  );
}