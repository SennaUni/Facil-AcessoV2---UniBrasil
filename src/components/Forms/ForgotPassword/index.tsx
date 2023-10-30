import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions, Text } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { schema, FormData } from './zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleForgotPassword(data: FormData) {
    console.log(data)
  }

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [reset])
  )

  return (
    <Container>
      {/* <KeyboardAvoidingView behavior="position" enabled> */}
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 120,
        }}
      >
        <ArrowButtom
          loading={loading}
          gradient={['#A88BEB', '#8241B8']}
          onPress={handleSubmit(handleForgotPassword)}
        />
      </View>
      <Header
        title='Alteração de senha'
      />

      <Input
        name="email"
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        control={control}
      />

      <View
        style={{
          backgroundColor: '#A88BEB',
          borderRadius: 20,
          marginTop: 25,
          borderColor: '#8241B8',
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: '#FFF',
            padding: 10,
          }}
        >
          Como funciona?
        </Text>
        <Text
          style={{
            fontSize: 16,
            padding: 10,
            color: '#FFF',
          }}
        >
          Informe seu e-mail no campo acima. Em seguira será enviado um e-mail no endereço informado. Em seguida acesse o link enviado no e-mail para resetar a senha..
        </Text>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Container>
  )
}