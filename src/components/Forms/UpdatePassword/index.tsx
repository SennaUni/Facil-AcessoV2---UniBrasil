import React, { useCallback, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { updatePasswordApiRequest } from '../../../api/authRequests';

import { schema, FormData } from './zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '../../../hooks/redux';

import { PasswordInput } from '../../Basics/PasswordInput';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const [loading, setLoading] = useState(false)

  const { user } = useAppSelector((state) => state.auth)

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { addToast } = useToast()
  const { navigate } = useNavigation()

  async function handleUpdatePassword(data: FormData) {
    setLoading(true)

    try {
      await updatePasswordApiRequest({
        id: user.id,
        senhaAtual: data.oldPassword,
        senhaNova: data.newPassword,
      })

      addToast({
        title: 'Operação realizada com sucesso!',
        description: 'Senha editada',
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
      reset()
    }, [])
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
            onPress={handleSubmit(handleUpdatePassword)}
          />
        </View>

        <Header
          title='Alterar senha'
        />
        <PasswordInput
          name="oldPassword"
          icon="lock"
          placeholder="Senha atual"
          control={control}
        />

        <PasswordInput
          name="newPassword"
          icon="lock"
          placeholder="Nova senha"
          control={control}
        />

        <PasswordInput
          name="newPasswordConfirm"
          icon="lock"
          placeholder="Confirmar nova senha"
          control={control}
        />
      </KeyboardAvoidingView>
    </Container>
  )
}