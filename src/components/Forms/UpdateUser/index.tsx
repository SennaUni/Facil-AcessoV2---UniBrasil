import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { listAcessibility } from '../../../store/slices/acessibilitySlice';
import { updateProfileAsync } from '../../../store/slices/authSlice';

import { useToast } from '../../../hooks/toast';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { schema, FormData } from './zodSchema';

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Select } from '../../Basics/Select';
import { Header } from '../../Header';
import { OptionSelect } from '../../Basics/OptionSelect';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, formState, setValue } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  console.log(formState.errors)

  const { addToast } = useToast()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)
  const { acessibility } = useAppSelector((state) => state.acessibility)

  const selectOptions = acessibility
    ? acessibility.map(value => ({
      id: value.id,
      icon: value.icon,
      value: value.descricao,
    }))
    : []

  async function handleUpdateUser(data: FormData) {
    setLoading(true)

    try {
      dispatch(updateProfileAsync({
        id: user.id,
        data: {
          login: data.name,
          dataNascimento: '',
          telefone: data.phoneNumber.toString(),
          cpf: data.document,
          acessibilidade: [Number(data.acessibility.id)],
          email: data.email
        }
      }))

      addToast({
        title: 'Operação realizada com sucesso!',
        description: `Usuário ${data.name} editado`,
        type: 'success'
      })

      navigate('principal' as never)
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
      const GetAcessibility = () => dispatch(listAcessibility())

      if (!acessibility) GetAcessibility()
    }, [acessibility])
  )

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setValue('name', user.login)
        setValue('email', user.email)
        setValue('document', user.cpf)
        setValue('phoneNumber', user.telefone)
      }
    }, [user])
  )

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
            onPress={handleSubmit(handleUpdateUser)}
          />
        </View>

        <Header
          title='Alterar meus dados'
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
          name="document"
          icon="check-circle"
          placeholder="Cpf"
          keyboardType="number-pad"
          control={control}
        />

        <Input
          name="phoneNumber"
          icon="user"
          placeholder="Telefone para contato"
          control={control}
        />

        <Select
          name="acessibility"
          icon="handshake-o"
          placeholder="Defina a acessibilidade"
          header='Selecione sua acessibilidade'
          label="Usuario"
          OptionComponent={OptionSelect}
          defaultValue={{
            id: user.acessibilidades[0].id.toString(),
            icon: user.acessibilidades[0].icon,
            value: user.acessibilidades[0].descricao,
          }}
          onChange={setValue}
          control={control}
          options={selectOptions}
        />
      </KeyboardAvoidingView>
    </Container>
  )
}