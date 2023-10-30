import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View } from 'react-native';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { FormData as firstFormData, schema as firstSchema } from '../AddComment/zodSchema'
import { FormData as secondFormData, schema as secondSchema } from '../AddAccessibility/zodSchema'

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';

import { useToast } from '../../../hooks/toast';

import { Container, Content } from './styles';
import { useFocusEffect } from '@react-navigation/native';

export function Form() {
  const [loading, setLoading] = useState(false);
  const [pageForm, setPageForm] = useState(1);
  const [selectRate, setSelectRate] = useState({});
  const [selectCommerce, setSelectCommerce] = useState({});
  const [access, setAccess] = useState([]);

  const methods = useForm<any>({
    resolver: zodResolver(pageForm === 1 ? firstSchema : secondSchema)
  })

  const { addToast } = useToast();
  // const { dataAuth } = useAuth();

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

  async function handleRegisteComment() {
    if (pageForm === 1) {
      setPageForm(2)

      return
    }

    // try {

    //   // await handleFirebaseAddComment(data);

    // } catch (err) { 
    //   const error = {
    //     type: 'error', 
    //     title: 'Ocorreu um erro', 
    //     description: 'Não foi possível cadastrar o comentário',
    //   }
    //   // addToast(error);
    // }
  }

  useFocusEffect(
    useCallback(() => {
      methods.reset()
    }, [methods.reset])
  )

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        {/* <Unform ref={formRef} onSubmit={handleRegisteComment}> */}
        <FormProvider {...methods} >
          <Content
            opacity={pageForm === 1 ? 1 : 0}
            height={pageForm === 1 ? 'auto' : 0}
          >
            <FormComment
              callBack={handleRegisteComment}
              loading={loading}
            />
          </Content>
          <Content
            opacity={pageForm === 1 ? 0 : 1}
            height={pageForm === 1 ? 0 : 'auto'}
          >
            <FormAccessibility 
              callBack={handleRegisteComment}
              loading={loading}
            />
          </Content>
        </FormProvider>
        {/* </Unform> */}
      </KeyboardAvoidingView>
    </Container>
  )
}