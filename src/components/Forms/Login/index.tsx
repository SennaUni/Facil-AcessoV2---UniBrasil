import React, { useEffect } from 'react';

import { loginAsync } from '../../../store/slices/authSlice';

import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

const { width } = Dimensions.get('window');

export function Form() {
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const dispatch = useAppDispatch()
  const { navigate } = useNavigation()
  const { addToast } = useToast()

  const { loading, error, sucess } = useAppSelector((state) => state.auth)
  async function handleUserLogin(data: FormData) {
    try {
      dispatch(loginAsync({
        login: data.user,
        senha: data.password
      }))
    } catch (err) {
      addToast({
        title: 'Ops, ocorreu um erro!',
        description: err.message,
        type: 'error'
      })
    }
  }

  useEffect(() => {
    if (error) {
      addToast({
        title: 'Ops, ocorreu um erro!',
        description: error,
        type: 'error'
      })
    }
  }, [error])

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
            onPress={handleSubmit(handleUserLogin)}
          />
        </View>

        <Header
          title='Realizar login'
        />

        <Input
          name="user"
          icon="mail"
          placeholder="Usuário"
          // keyboardType="email-address"
          // autoCapitalize='none'
          control={control}
        />

        <PasswordInput
          name="password"
          icon="lock"
          placeholder="Senha"
          control={control}
        />
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