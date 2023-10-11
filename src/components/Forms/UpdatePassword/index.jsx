import React, { useRef, useCallback, useState } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Form as Unform } from '@unform/mobile';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import * as Yup from 'yup';
import { schema } from './schema';

import { PasswordInput } from '../../Basics/PasswordInput';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export function Form() {
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { navigate } = useNavigation();
  const { dataAuth, updateValues } = useAuth();

  async function handleFirebaseUpdatePassword({ oldPassword, newPassword }) {
    auth()
      .signInWithEmailAndPassword(dataAuth.email, oldPassword)
      .then(() => {
        const user = auth().currentUser;

        user.updatePassword(newPassword);

        firestore()
      .collection('users')
      .doc(dataAuth.uid)
      .update({
        password: newPassword
      })

        updateValues({
          password: newPassword,
        })
          
        const success = {
          type: 'success', 
          title: 'Senha atualizada com sucesso', 
          description: 'Tome cuidado na proxima vez',
        }

        addToast(success);

        setTimeout(() => {
          navigate('perfil');
        }, 2000);
      })
      .catch((err) => { console.log(err)
        const error = {
          type: 'error', 
          title: 'Ocorreu um erro', 
          description: 'A senha informada esta inválida',
        }

        addToast(error);
      })
      .finally(() => setLoading(false));
  }

  async function handleUpdatePassword(data) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      await schema.validate(data, { abortEarly: false });

      await handleFirebaseUpdatePassword(data);

    } catch (err) {
      const validationErrors = {};
      
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
        console.log(validationErrors);
      }

      setLoading(false)
    } 
  }

  useFocusEffect(
    useCallback (() => {
      formRef.current.setData({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      })
    }, [])
  );

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
            gradient={[ '#A88BEB', '#8241B8' ]}
            onPress={() => formRef.current.submitForm()}
          />
        </View>

        <Header 
          title='Alterar senha'
        />
        <Unform ref={formRef} onSubmit={handleUpdatePassword}>
          <PasswordInput
            name="oldPassword"
            icon="lock"
            placeholder="Senha atual"
          />
          <PasswordInput
            name="newPassword"
            icon="lock"
            placeholder="Nova senha"
          />
          <PasswordInput
            name="newPasswordConfirm"
            icon="lock"
            placeholder="Confirmar nova senha"
          />
        </Unform>
      </KeyboardAvoidingView>
    </Container>
  )
}