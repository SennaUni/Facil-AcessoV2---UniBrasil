import React, { useRef } from 'react';

import { Form as Unform } from '@unform/mobile';

import { loginAsync } from '../../../store/slices/authSlice';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { z } from 'zod';
import { schema, FormData } from './zodSchema';

import { FacebookButton } from '../../FacebookButton';
import { GmailButton } from '../../GmailButton';
import { GithubButton } from '../../GithubButton';
import { TwitterButton } from '../../TwitterButton';
import { LinkedinButton } from '../../LinkedinButton';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { Header } from '../../Header';
import { Divider } from '../../Divider';
import { useToast } from '../../../hooks/toast';

import { Container, Options, OptionsText, LoginContainer, Logins } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { addToast } = useToast();

  const {
    user,
    loading,
    error,
  } = useAppSelector((state) => state.auth);

  console.log(user)

  async function handleUserLogin(data: FormData) {
    try {
      formRef.current.setErrors({});

      // await schema.parseAsync(data);

      dispatch(loginAsync({
        login: 'mirandaTeste',
        senha: '123'
      }))

      addToast({
        title: 'Login realizado com sucesso!',
        description: 'Seja bem vindo ao fácil acesso',
        type: 'success'
      })

    } catch (err) {
      const validationErrors = {};

      if (err instanceof z.ZodError) {
        err.errors.forEach(error => {
          validationErrors[error.path[0]] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useFocusEffect(() => {
    formRef.current.setData({
      email: '',
      password: '',
    })
  })

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        <View
          style={{
            position: 'absolute',
            top: -30,
            left: width - 120,
          }}
        >
          <ArrowButtom
            loading={loading === 'pending'}
            gradient={['#A88BEB', '#8241B8']}
            onPress={() => formRef.current.submitForm()}
          />
        </View>
        <Header
          title='Realizar login'
        />

        <Unform ref={formRef} onSubmit={handleUserLogin} style={{ marginVertical: 10 }}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize='none' // primeira letra começa como minuscula
          />
          <PasswordInput
            name="password"
            icon="lock"
            placeholder="Senha"
          />
        </Unform>
      </KeyboardAvoidingView>

      <Options>
        <TouchableOpacity
          onPress={() => navigate("forgotPassword" as never)}
        >
          <OptionsText color={'#6441A5'} >Esqueceu a senha?</OptionsText>
        </TouchableOpacity>
      </Options>

      <LoginContainer>
        <Divider
          color={'#6441A5'}
          lines={false}
          text='Or Sign up using'
        />
        <Logins>
          <GmailButton />
          <FacebookButton />
          <GithubButton />
          <TwitterButton />
          <LinkedinButton />
        </Logins>
      </LoginContainer>

      <Options>
        <TouchableOpacity
          onPress={() => navigate("register" as never)}
        >
          <OptionsText color={'#6441A5'}>Novo usuário? Se cadastre</OptionsText>
        </TouchableOpacity>
      </Options>

    </Container>
  )
}