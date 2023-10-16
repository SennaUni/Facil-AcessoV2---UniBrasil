import React, { useState, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { z } from 'zod';
import { schema, FormData } from './zodSchema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export function Form({ callBack, getSelectRate, getSelectCommerce, formRef, loading }) {
  const [optionsRate, setOptionsRate] = useState([]);
  const [selectRate, setSelectRate] = useState('');
  const [errorRate, setErrorRate] = useState(false);

  const [optionsCommerce, setOptionsCommerce] = useState([]);
  const [selectCommerce, setSelectCommerce] = useState('');
  const [errorCommerce, setErrorCommerce] = useState(false);

  async function handleChangeForm() {
    try {
      setErrorRate(false);
      setErrorCommerce(false);

      const data = formRef.current.getData();

      formRef.current.setErrors({});

      if (!selectRate && !selectCommerce) {
        setErrorRate(true)
        setErrorCommerce(true);
        await schema.parseAsync(data)
        return
      }

      if (!selectRate) {
        setErrorRate(true)
        await schema.parseAsync(data)
        return
      }

      if (!selectCommerce) {
        setErrorCommerce(true)
        await schema.parseAsync(data)
        return
      }

      setErrorRate(false);
      setErrorCommerce(false);

      await schema.parseAsync(data)

      callBack();
      getSelectRate(selectRate);
      getSelectCommerce(selectCommerce);

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

  useFocusEffect(
    useCallback(() => {
      setErrorRate(false);
      setErrorCommerce(false);

      // const rateOptions = () => {
      //   firestore()
      //     .collection('rate')
      //     .get()
      //     .then((value) => {
      //       const data = value.docs.map(doc => doc.data())
      //       setOptionsRate(data);
      //     })
      // }

      // const commerceOptions = () => {
      //   firestore()
      //     .collection('commerce')
      //     .get()
      //     .then((value) => {
      //       const data = value.docs.map(doc => doc.data())
      //       setOptionsCommerce(data);
      //     })
      // }

      // rateOptions();
      // commerceOptions();
    }, [])
  );

  return (
    <Container>
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
          onPress={() => handleChangeForm()}
        />
      </View>
      <Header
        title='Criar comentário'
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <Input
          name="name"
          icon="user"
          placeholder="Nome estabalecimento"
        />
        <Input
          name="address"
          icon="map-pin"
          placeholder="Endereço"
        />

        <Select
          options={optionsRate}
          icon="star"
          placeholder="Defina sua satisfação"
          header='Selecione sua satisfação'
          OptionComponent={OptionSelect}
          onChange={setSelectRate}
        />
        {errorRate && (
          <ErrorContainer>
            <Feather
              name="alert-triangle"
              size={24}
              color="#DC1637"
            />
            <Error> Selecione uma opção </Error>
          </ErrorContainer>
        )}

        <Select
          options={optionsCommerce}
          icon="shopping-bag"
          placeholder="Defina sua categoria"
          header='Selecione sua categoria'
          OptionComponent={OptionSelect}
          onChange={setSelectCommerce}
        />
        {errorCommerce && (
          <ErrorContainer>
            <Feather
              name="alert-triangle"
              size={24}
              color="#DC1637"
            />
            <Error> Selecione uma opção </Error>
          </ErrorContainer>
        )}

        <Input
          name="comment"
          icon="message-circle"
          placeholder="Insira um comentário"
          multiline
          numberOfLines={4}
        />
      </KeyboardAvoidingView>
    </Container>
  )
}