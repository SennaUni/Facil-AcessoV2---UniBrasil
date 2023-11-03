import React, { useState, useCallback } from 'react';

import { View, Dimensions } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useFocusEffect } from '@react-navigation/native';

import { useFormContext } from 'react-hook-form'

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { Select, SelectedValueType } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';

import { Container } from './styles';
import { listCommerce } from '../../../store/slices/commerceSlice';

const { width } = Dimensions.get('window');

export type FormParam = {
  callBack: (data: any) => void
  loading: boolean
}

export function Form({ callBack, loading }: FormParam) {
  const { commerce } = useAppSelector((state) => state.commerce)
  const dispatch = useAppDispatch()

  const rates = [
    { id: 1,  icon: 'meh-o', value: 'Recomendo' },
    { id: 2, icon: 'smile-o', value: 'Super recomendo' },
    { id: 3, icon: 'frown-o', value: 'Não recomendo' },
  ]

  const optionsCommerce = commerce
    ? commerce.map(value => ({
      id: value.id,
      icon: value.icon,
      value: value.descricao,
    }))
    : []

  const { control, handleSubmit, setValue, clearErrors } = useFormContext()

  useFocusEffect(
    useCallback(() => {
      if (!commerce) dispatch(listCommerce())
    }, [commerce])
  )

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
          onPress={handleSubmit(callBack)}
        />
      </View>
      <Header
        title='Criar comentário'
      />
        <Input
          name="name"
          icon="user"
          placeholder="Nome estabalecimento"
          control={control}
        />

        <Select
          options={rates}
          name='satisfation'
          icon="star"
          placeholder="Defina sua satisfação"
          header='Selecione sua satisfação'
          OptionComponent={OptionSelect}
          onChange={(name: string, item: SelectedValueType) => { 
            setValue(name, item)
            clearErrors('satisfation')
          }}
          control={control}
        />

        <Select
          name='category'
          options={optionsCommerce}
          icon="shopping-bag"
          placeholder="Defina sua categoria"
          header='Selecione sua categoria'
          OptionComponent={OptionSelect}
          onChange={(name: string, item: SelectedValueType) => { 
            setValue(name, item)
            clearErrors('category')
          }}
          control={control}
        />

        <Input
          name="comment"
          icon="message-circle"
          placeholder="Insira um comentário"
          numberOfLines={4}
          control={control}
          multiline
        />
    </Container>
  )
}