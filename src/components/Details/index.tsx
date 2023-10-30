import React, { useState, useCallback } from 'react';

import { TouchableOpacity, Modal, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import { DataTable } from '../DataTable/Accessibilities';

import { Container, ButtonDetails, DeatilsText, ModalContent, ModalHeader, ModalButtons, ModalDeatils, Icon, Title, SubTitle, Text, CommentText, RowView } from './styles';

export function Deatils({ data }) {
  const [openModal, setOpenModal] = useState(false)

  const rates = [
    { icon: 'meh-o', value: 'Recomendo' },
    { icon: 'smile-o', value: 'Super recomendo' },
    { icon: 'frown-o', value: 'Não recomendo' },
  ]

  useFocusEffect(
    useCallback (() => {
      // Buscar imagens
    }, [data])
  );

  return (
    <>
      <Container>
       <ButtonDetails
        onPress={() => setOpenModal(true)}
       >
        <DeatilsText>
          Mais detalhes
        </DeatilsText>
       </ButtonDetails>

        <Modal 
          animationType='slide'
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        >
          <ModalContent colors={[ '#6C33A3', '#8241B8' ]}>
            <ModalHeader>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
              >
                <FontAwesome
                  name='close'
                  size={30}
                  color={'#FFF'}
                />
              </TouchableOpacity>
              <ModalButtons>
              <TouchableOpacity
                onPress={() => console.log('anterior')}
              >
                <FontAwesome
                  name='arrow-left'
                  size={20}
                  color={'#FFF'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('proximo')}
              >
                <FontAwesome
                  name='arrow-right'
                  size={20}
                  color={'#FFF'}
                />
              </TouchableOpacity>
              </ModalButtons>
            </ModalHeader>
            <ModalDeatils>

            <View 
              style={{
                position : 'absolute', 
                top : -20, 
                left : 15,
              }}
            >
              <Icon colors={[ '#A88BEB', '#8241B8' ]}>
                <FontAwesome
                  name={rates[2].icon as any}
                  // name={rates[data.nivelSatisfacao] as any}
                  size={40}
                  color='#FFF'
                />
              </Icon>
            </View>
            <View 
              style={{
                position : 'absolute', 
                top : -20, 
                left : 300,
              }}
            >
              <Icon colors={[ '#A88BEB', '#8241B8' ]}>
                <FontAwesome
                  name={data.estabelecimento.icon}
                  size={34}
                  color='#FFF'
                />
              </Icon>
            </View>
              <Title>
                {data.nomeEstabelecimento}
              </Title>
              <RowView>
                <FontAwesome
                  name='map-marker'
                  size={30}
                  color='#8241B8'
                />
                <Text>{data.rua} nº {data.numero}, {data.bairro} {data.estado} - {data.cep}</Text>
              </RowView>
              <SubTitle>
                Comentário
              </SubTitle>
              <CommentText>
                {data.comentario}
              </CommentText>
              <SubTitle>
                  Acessibilidades Presentes
              </SubTitle>
              <DataTable 
                data={data.acessibilidade} 
              />
            </ModalDeatils>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}