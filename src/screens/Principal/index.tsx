import React, { useState, useCallback } from 'react';

import { TouchableOpacity, StatusBar } from 'react-native';

import { useAppSelector } from '../../hooks/redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import { DataTable as FilterOptions } from '../../components/DataTable/FilterOptions';
import { DataTable } from '../../components/DataTable/Comments';

import { Container, Content, Comments, CommentsText, Icon, CommentsCards } from './styles';

export function Principal() {
  const [accessOptions, setAccessOptions] = useState([]);
  const [commerceOptions, setCommerceOptions] = useState([]);
  const [commentsOptions, setCommentsOptions] = useState([]);
  const [access, setAccesss] = useState(null);
  const [commerce, setCommerce] = useState(null);

  const { navigate } = useNavigation();

  const {
    user,
    loading,
    error,
  } = useAppSelector((state) => state.auth)

  const dados = commentsOptions

  // const dados = (access && commerce)
  //   ? commentsOptions.filter(item => item.data.access
  //                    .find(item2 => item2.acessibilidade === access.value))
  //                    .filter(valor => valor.data.commerce.value === commerce.value )
  //     : access
  //     ? commentsOptions.filter(item => item.data.access
  //                      .find(item2 => item2.acessibilidade === access.value))
  //       : commerce
  //         ? commentsOptions.filter(item => item.data.commerce.value === commerce.value)
  //         : user.accessibility 
  //           ? commentsOptions.filter(item => item.data.access
  //                            .find(item2 => item2.acessibilidade === dataAuth.accessibility))
  //             : commentsOptions;

  useFocusEffect(
    useCallback(() => {
      setAccesss(null);
      setCommerce(null);

      const AccessOptions = () => {
        // firestore()
        //   .collection('accessibility')
        //   .get()
        //   .then((value) => {
        //     const data = value.docs.map(doc => doc.data())
        //     setAccessOptions(data);
        //   })
      }

      const CommercesOptions = () => {
        // firestore()
        //   .collection('commerce')
        //   .get()
        //   .then((value) => {
        //     const data = value.docs.map(doc => doc.data())
        //     setCommerceOptions(data);
        //   })
      }

      const Subscriber = () => {
        // firestore()
        //   .collection('comments')
        //   .onSnapshot(querySnapshot => {
        //     const data = querySnapshot.docs.map(doc => {
        //       return {
        //         id: doc.id,
        //         data: doc.data(),
        //       }
        //     })
        //     setCommentsOptions(data);
        //   })
      }

      AccessOptions();
      CommercesOptions();
      Subscriber();
    }, [])
  );

  return (
    <Container
      vertical
      showsVerticalScrollIndicator={false}
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={'transparent'}
        translucent
      />

      <Content colors={['#6C33A3', '#8241B8']}>
        <FilterOptions
          data={accessOptions}
          header="Acessibilidades"
          callBack={setAccesss}
        />
        <FilterOptions
          data={commerceOptions}
          header="Estabelecimento"
          callBack={setCommerce}
        />
        <Comments>
          <CommentsText>Comentarios</CommentsText>
          {/* {dataAuth.uid &&  */}
          <TouchableOpacity
            // onPress={() => navigate('registerComment')}
            onPress={() => console.log('Cliquei')}
          >
            <Icon colors={['#A88BEB', '#8241B8']}>
              <FontAwesome
                name='plus'
                size={30}
                color='#FFF'
              />
            </Icon>
          </TouchableOpacity>
          {/* } */}
        </Comments>
        <CommentsCards>
          <DataTable
            data={dados}
          />
        </CommentsCards>
      </Content>
    </Container>
  );
}
