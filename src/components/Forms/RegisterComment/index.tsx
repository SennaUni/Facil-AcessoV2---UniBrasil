import React, { useState, useRef, useCallback } from 'react';

import { KeyboardAvoidingView, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import { Form as FormComment } from '../AddComment';
import { Form as FormAccessibility } from '../AddAccessibility';

import { useToast } from '../../../hooks/toast';

import { Container, Content } from './styles';

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [pageForm, setPageForm] = useState(1);
  const [selectRate, setSelectRate] = useState({});
  const [selectCommerce, setSelectCommerce] = useState({});
  const [access, setAccess] = useState([]);

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

  async function handleRegisteComment(data) {
    try {

      // await handleFirebaseAddComment(data);

    } catch (err) { 
      const error = {
        type: 'error', 
        title: 'Ocorreu um erro', 
        description: 'Não foi possível cadastrar o comentário',
      }
      // addToast(error);
    }
  }

  useFocusEffect(
    useCallback (() => {
      formRef.current.setErrors({});
      
      // formRef.current.setData({
      //   name: '',
      //   address: '',
      //   comment: '',
      //   accessibility: '',
      // })  

      setPageForm(1);
    }, [])
  );

  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        <Unform ref={formRef} onSubmit={handleRegisteComment}>
          <Content
             opacity={pageForm === 1 ? 1 : 0}
             height={pageForm === 1 ? 'auto' : 0}
          >
            <FormComment 
              callBack={() =>  setPageForm(2)}
              loading={loading}
              formRef={formRef}
              getSelectRate={setSelectRate}
              getSelectCommerce={setSelectCommerce}
            />
          </Content>
          <Content 
             opacity={pageForm === 1 ? 0 : 1}
             height={pageForm === 1 ? 0 : 'auto'}
          >
            <FormAccessibility 
              callBack={() => setPageForm(1)}
              onSubmit={() => formRef.current.submitForm()}
              // loading={loading}
              getAccess={setAccess}
              formRef={formRef}
            />
          </Content>
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}