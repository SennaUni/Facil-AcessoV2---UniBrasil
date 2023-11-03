import React, { useState, useRef, useCallback } from 'react';

import { listComment } from '../../../store/slices/commentSlice';
import { listMyComment } from '../../../store/slices/myCommentSlice';
import { listMyFavorite } from '../../../store/slices/myFavoriteSlice';

import { createCommentApiRequest } from '../../../api/commentRequests';

import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { zodResolver } from '@hookform/resolvers/zod'

import { FormData as firstFormData, schema as firstSchema } from '../AddComment/zodSchema'
import { FormData as secondFormData, schema as secondSchema } from '../AddAccessibility/zodSchema'
import { FormData as ThirdFormData, schema as ThirdSchema } from '../AddAddress/zodSchema'

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';
import { Form as FormAddress } from '../AddAddress';

import { useToast } from '../../../hooks/toast';

import { Container, Content } from './styles';
import { useFocusEffect } from '@react-navigation/native';

type CommentDataType = {
  address: string
  category: SelectData
  city: string
  comment: string
  name: string
  neighborhood: string
  number: string
  satisfation: SelectData
  state: SelectData
  zipCode: string
}

export interface SelectData {
  icon: string
  id: number | string
  value: string
}

export function Form() {
  const [loading, setLoading] = useState(false)
  const [pageForm, setPageForm] = useState(1)
  const [commentData, setCommentData] = useState<CommentDataType>({} as CommentDataType)

  const methods = useForm<any>({
    resolver: zodResolver(pageForm === 1 ? firstSchema : pageForm === 2 ? ThirdSchema : secondSchema)
  })

  const { user } = useAppSelector((state) => state.auth)

  const { addToast } = useToast()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  async function handleRegisteComment(data: any) {
    if (pageForm === 1 || pageForm === 2) {
      setCommentData({
        ...commentData,
        ...data
      })
      setPageForm(pageForm === 1 ? 2 : 3)
      return
    }

    setLoading(true)

    try {
      await createCommentApiRequest({
        estabelecimentoId: Number(commentData.category.id),
        nomeEstabelecimento: commentData.name,
        complemento: 'asd',
        rua: commentData.address,
        numero: Number(commentData.number),
        bairro: commentData.neighborhood,
        estado: commentData.state.id.toString(),
        cidade: commentData.city,
        cep: commentData.zipCode,
        nivelSatisfacao: Number(commentData.satisfation.id),
        comentario: commentData.comment,
        usuario: user.id,
        acessibilidade: data.map((value: any) => value.id)
      })

      addToast({
        type: 'success',
        title: 'Operação realizada com sucesso',
        description: 'Comentário cadastrado',
      })

      dispatch(listComment(user.id))
      dispatch(listMyComment(user.id))
      dispatch(listMyFavorite(user.id))

      navigate('principal' as never)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro',
        description: 'Não foi possível cadastrar o comentário',
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      methods.reset()
      setPageForm(1)
    }, [methods.reset, setPageForm])
  )

  return (
    <Container>
      <FormProvider {...methods} >
        <Content
          opacity={pageForm === 1 ? 1 : 0}
          height={pageForm === 1 ? 'auto' : 0}
        >
          <FormComment
            callBack={(data: any) => handleRegisteComment(data)}
            loading={loading}
          />
        </Content>

        <Content
          opacity={pageForm === 2 ? 1 : 0}
          height={pageForm === 2 ? 'auto' : 0}
        >
          <FormAddress
            callBack={(data: any) => handleRegisteComment(data)}
            callReturn={() => setPageForm(1)}
            loading={loading}
          />
        </Content>

        <Content
          opacity={pageForm === 3 ? 1 : 0}
          height={pageForm === 3 ? 'auto' : 0}
        >
          <FormAccessibility
            callBack={(data: any) => handleRegisteComment(data)}
            callReturn={() => setPageForm(2)}
            loading={loading}
          />
        </Content>
      </FormProvider>
    </Container>
  )
}