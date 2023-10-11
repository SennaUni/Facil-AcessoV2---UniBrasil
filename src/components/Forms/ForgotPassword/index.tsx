import React, { useState, useRef } from 'react';

import { KeyboardAvoidingView, View, Dimensions, Text } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { z } from 'zod';
import { schema, FormData } from './zodSchema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { height, width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  async function handleForgotPassword(data: FormData) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      await schema.parseAsync(data);

    } catch (err) {
      const validationErrors = {};

      if (err instanceof z.ZodError) {
        err.errors.forEach(error => {
          validationErrors[error.path[0]] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      setLoading(false)
    }
  }

  useFocusEffect(() => {
    formRef.current.setData({
      email: '',
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
            loading={loading}
            gradient={['#A88BEB', '#8241B8']}
            onPress={() => formRef.current.submitForm()}
          />
        </View>
        <Header
          title='Alteração de senha'
        />

        <Unform ref={formRef} onSubmit={handleForgotPassword}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize='none' // primeira letra começa como minuscula
          />
          {/* <Buttom
            title="Editar"
            onPress={() => formRef.current.submitForm()}
          /> */}
        </Unform>
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
      </KeyboardAvoidingView>
    </Container>
  )
}