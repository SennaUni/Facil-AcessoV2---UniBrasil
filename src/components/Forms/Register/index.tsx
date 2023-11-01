import React, { useCallback, useState } from 'react';

import { View, Dimensions } from 'react-native';

import { listAcessibility } from '../../../store/slices/acessibilitySlice';

import { useFocusEffect } from '@react-navigation/native';

import { createUserApiRequest } from '../../../api/authRequests';

import { useNavigation } from '@react-navigation/native';

import { schema, FormData } from './zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { Input } from '../../Basics/Input';
import { PasswordInput } from '../../Basics/PasswordInput';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { addToast } = useToast()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  const { acessibility } = useAppSelector((state) => state.acessibility)

  const selectOptions = acessibility
    ? acessibility.map(value => ({
      id: value.id,
      icon: value.icon,
      value: value.descricao,
    }))
    : []

  async function handleUserRegister(data: FormData) {
    setLoading(true)

    try {
      await createUserApiRequest({
        login: data.name,
        senha: data.password,
        telefone: data.phoneNumber,
        cpf: data.document,
        acessibilidade: [data.acessibility.id],
        email: data.email,
        dataNascimento: '',
      })

      addToast({
        title: 'Operação realizada com sucesso!',
        description: `Usuário ${data.name} cadastrado`,
        type: 'success'
      })

      navigate('login' as never)
    } catch (err) {
      addToast({
        title: 'Ops, ocorreu um erro!',
        description: err.message,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [reset])
  )

  useFocusEffect(
    useCallback(() => {
      const GetAcessibility = () => dispatch(listAcessibility())

      if (!acessibility) GetAcessibility()
    }, [acessibility])
  )

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
          onPress={handleSubmit(handleUserRegister)}
        />
      </View>

      <Header
        title='Criar usuário'
      />

      <Input
        name="name"
        icon="user"
        placeholder="Nome"
        control={control}
      />

      <Input
        name="email"
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        control={control}
      />

      <Input
        name="phoneNumber"
        icon="phone"
        placeholder="Telefone para contato"
        keyboardType="phone-pad"
        control={control}
      />

      <Input
        name="document"
        icon="check-circle"
        placeholder="Cpf"
        keyboardType="number-pad"
        control={control}
      />

      <Select
        name="acessibility"
        icon="handshake-o"
        placeholder="Defina a acessibilidade"
        header='Selecione sua acessibilidade'
        label="Usuario"
        OptionComponent={OptionSelect}
        onChange={setValue}
        control={control}
        options={selectOptions}
      />

      <PasswordInput
        name="password"
        icon="lock"
        placeholder="Senha"
        control={control}
      />
      <PasswordInput
        name="passwordConfirm"
        icon="lock"
        placeholder="Confirme a senha"
        control={control}
      />
    </Container>
  )
}