import React, { useState, useCallback, useEffect } from 'react';

import { KeyboardAvoidingView, View, Dimensions } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { z } from 'zod';
import { schema, FormData } from './zodSchema';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Select } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';
import { DataTable } from '../../DataTable/Accessibilities';
import { Header } from '../../Header';

import { useToast } from '../../../hooks/toast';

import { useFormContext } from 'react-hook-form'

import { Container, ErrorContainer, Error } from './styles';

const { width } = Dimensions.get('window');

export type FormParam = {
  callBack: () => void
  loading: boolean
}

export function Form({ callBack, loading }: FormParam) {
  const { addToast } = useToast();
  const { navigate } = useNavigation();

  const { control, getValues, setError, handleSubmit } = useFormContext()

  // function onSubmitForm() {
  //   setLoading(true);

  //   if (accessibilities.length === 0) {
  //     addToast({
  //       type: 'error', 
  //       title: 'Ocorreu um erro', 
  //       description: 'Nenhuma acessibilidade cadastrada',
  //     })

  //     setLoading(false)
  //     return
  //   } 

  //   getAccess(accessibilities);

  //   // setTimeout(() => {
  //   //   onSubmit();
  //   //   setLoading(false);
  //   //   navigate('principal');
  //   // }, 1000);
  // }

  // async function handleAddAccess() {
  //   try {
  //     const data = formRef.current.getData();

  //     formRef.current.setErrors({});

  //     if (!select) {
  //       setError(true);
  //       await schema.parseAsync(data)
  //       return;
  //     } 
        
  //     setError(false);

  //     await schema.parseAsync(data)

  //     // const access ={
  //     //   descricao: data.accessibility,
  //     //   acessibilidade: select.value,
  //     //   icon: select.icon,
  //     // };

  //     setAccessibilities([
  //       ...accessibilities,
  //       // access,
  //     ]);  
      
  //     addToast({
  //       type: 'success', 
  //       title: 'Acessibilidade cadastrada', 
  //       description: 'Acessibilidade cadastrada com sucesso',
  //     })

  //   } catch (err) {
  //     const validationErrors = {};
      
  //     if (err instanceof z.ZodError) {
  //       err.errors.forEach(error => {
  //         validationErrors[error.path[0]] = error.message;
  //       });

  //       formRef.current.setErrors(validationErrors);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   setError(false);

  //     formRef.current.setErrors({});
      
  //     formRef.current.setData({
  //       accessibility: '',
  //     })  
  // }, [accessibilities])

  // useFocusEffect(
  //   useCallback (() => {
  //     setError(false);

  //     // const AccessOptions = () => {
  //     //   firestore()
  //     //     .collection('accessibility')
  //     //     .get()
  //     //     .then((value) => {
  //     //       const data = value.docs.map(doc => doc.data())
  //     //       setOptions(data);
  //     //     })
  //     // }
  
  //     // AccessOptions();
  //   }, [])
  // );

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: 210,
        }}
      >
        <ArrowButtom
          // loading={loading}
          reverse={true}
          gradient={[ '#A88BEB', '#8241B8' ]}
          onPress={() => callBack()}
        />
      </View>

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
          // onPress={handleSubmit(callBack)}
          onPress={() => console.log('Teria q voltar ne')}
        />
      </View>

      <Header 
        title='Acessibilidades presentes'
      />

      {/* { accessibilities && <DataTable data={accessibilities} /> } */}

      <KeyboardAvoidingView behavior="position" enabled>
          {/* <Select 
            options={options}
            icon="universal-access"
            placeholder="Defina a acessibilidade"
            header='Selecione a acessibilidade'
            label="Usuario"
            OptionComponent={OptionSelect}
            onChange={setSelect}
          /> */}

          <Input
            name="accessibility"
            icon="pen-tool"
            placeholder="Descreva a accessibilidade"
            multiline
            numberOfLines={3}
            control={control}
          />

          <Buttom
            title="Cadastrar"
            onPress={handleSubmit(callBack)}
          />

      </KeyboardAvoidingView>
    </Container>
  )
}