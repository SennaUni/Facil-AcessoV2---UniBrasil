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

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';

import { useToast } from '../../../hooks/toast';

import { Container, Content } from './styles';
import { useFocusEffect } from '@react-navigation/native';

export function Form() {
  const [loading, setLoading] = useState(false)
  const [pageForm, setPageForm] = useState(1)
  const [commentData, setCommentData] = useState<any>()

  const methods = useForm<any>({
    resolver: zodResolver(pageForm === 1 ? firstSchema : secondSchema)
  })

  const { user } = useAppSelector((state) => state.auth)

  const { addToast } = useToast()
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  // async function handleFirebaseAddComment({ address, comment, name }) {
  //   firestore()
  //     .collection('comments')
  //     .add({
  //       name,
  //       address,
  //       comment,
  //       rate: selectRate,
  //       commerce: selectCommerce,
  //       access: access,
  //       liked_by: '',
  //       created_by: dataAuth.uid,
  //       create_at: firestore.FieldValue.serverTimestamp()
  //     })
  //     .then(() => {
  //       const success = {
  //         type: 'success', 
  //         title: 'Comentário realizado com sucesso', 
  //         description: 'Obrigado por contribuir nessa batalha',
  //       }
  //       addToast(success);
  //     })
  //     .catch((err) => {
  //       const error = {
  //         type: 'error', 
  //         title: 'Ocorreu um erro', 
  //         description: 'Erro ao atualizar usuário',
  //       }

  //       addToast(error);
  //     })
  //     .finally(() => setLoading(false));
  // }

  async function handleRegisteComment(data: any) {
    if (pageForm === 1) {
      setCommentData(data)
      setPageForm(2)
      return
    }

    console.log('Show de bola familia')
    console.log(data)
    console.log(commentData)

    setLoading(true)

    try {
      await createCommentApiRequest({
        estabelecimentoId: 1,
        nomeEstabelecimento: 'nome teste',
        rua: 'rua teste',
        numero: 125,
        complemento: 'adas',
        bairro: 'bairro teste',
        estado: 'estado teste',
        cidade: 'cidade teste',
        cep: 'cep teste',
        nivelSatisfacao: 2,
        comentario: 'comentario teste',
        usuario: user.id,
        acessibilidade: [1]
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
    }, [methods.reset])
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
          opacity={pageForm === 1 ? 0 : 1}
          height={pageForm === 1 ? 0 : 'auto'}
        >
          <FormAccessibility
            callBack={(data: any) => handleRegisteComment(data)}
            callReturn={() => setPageForm(1)}
            loading={loading}
          />
        </Content>
      </FormProvider>
    </Container>
  )
}