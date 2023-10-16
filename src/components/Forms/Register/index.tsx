import React, { useRef, useState, useCallback } from 'react';

import { View, Dimensions } from 'react-native';

import { Form as Unform } from '@unform/mobile';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { z } from 'zod';
import { schema, FormData } from './zodSchema';

import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState('');
  const [error, setError] = useState(false);

  const { addToast } = useToast();
  const { navigate } = useNavigation();

  async function handleUserRegister(data) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      if (!select) {
        setError(true);

        await schema.parseAsync(data);

        return;
      } else {
        setError(false);
      }

      await schema.parseAsync(data);

    } catch (err) {
      const validationErrors = {};

      if (err instanceof z.ZodError) {
        err.errors.forEach(error => {
          validationErrors[error.path[0]] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      setLoading(false);
    }
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     const acessibilityOptions = () => {
  //       firestore()
  //         .collection('accessibility')
  //         .get()
  //         .then((value) => {
  //           const data = value.docs.map(doc => {
  //             return {
  //               ...doc.data(),
  //             }
  //           })
  //           setOptions(data);
  //         })
  //     }

  //     acessibilityOptions();

  //     formRef.current.setData({
  //       name: '',
  //       email: '',
  //       phoneNumber: '',
  //       accessibility: '',
  //       password: '',
  //       passwordConfirm: '',
  //     })
  //   }, [])
  // );

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 100,
        }}
      >
        <ArrowButtom
          loading={loading}
          gradient={['#A88BEB', '#8241B8']}
          onPress={() => formRef.current.submitForm()}
        />
      </View>

      <Header
        title='Criar usuário'
      />

      <Unform ref={formRef} onSubmit={handleUserRegister} style={{ marginVertical: 0 }}>
        <Input
          name="name"
          icon="user"
          placeholder="Nome"
        />
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none'
        />
        <Input
          name="phoneNumber"
          icon="phone"
          placeholder="Telefone para contato"
          keyboardType="phone-pad"
        />

        <Select
          options={options}
          icon="handshake-o"
          placeholder="Defina a acessibilidade"
          header='Selecione sua acessibilidade'
          label="Usuario"
          OptionComponent={OptionSelect}
          onChange={setSelect}
        />
        {error && (
          <ErrorContainer>
            <Feather
              name="alert-triangle"
              size={24}
              color="#DC1637"
            />
            <Error> Selecione uma opção </Error>
          </ErrorContainer>
        )}

        <PasswordInput
          name="password"
          icon="lock"
          placeholder="Senha"
        />
        <PasswordInput
          name="passwordConfirm"
          icon="lock"
          placeholder="Confirme a senha"
        />
      </Unform>
    </Container>
  )
}