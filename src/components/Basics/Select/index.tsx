import React, { useState, useCallback, useEffect } from 'react';

import { TouchableOpacity, Modal, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { Header } from '../../Header';

import { Container, ComboBox, IconContainer, ModalContent, ModalHeader, ModalTitle, ModalSelect, SelectTitle } from './styles';

export type SelectParam = {
  label?: string
  icon: any
  incialValue?: string
  options: any
  placeholder: string
  header: any
  OptionComponent: any
  onChange: any
}

export function Select({ icon, incialValue = null, options, placeholder, header, OptionComponent, onChange }: SelectParam) {

  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(); 

  function renderOption(item: any) {
    return (
      <OptionComponent 
        item={item}
        selectedValue={selectedValue}
        onPress={() => {
          setSelectedValue(item);
          onChange(item);
          setOpenModal(false);
        }}
      />
    )
  }

  useFocusEffect(
    useCallback (() => {
      const inicalSelectValue = options.find((item) => item.value === incialValue);
        onChange(inicalSelectValue);
        setSelectedValue(inicalSelectValue);
    }, [options])
  );

  return (
    <>
      <Container >
        <IconContainer>
         <FontAwesome
            name={icon}
            size={24}
            color={selectedValue ? '#6441A5' : '#AEAEB3'}
          />
        </IconContainer>

        <ComboBox
          onPress={() => setOpenModal(true)}
        >
          <SelectTitle 
            numberOfLines={1}
            color={selectedValue ? '#000' : '#AEAEB3'}
          >
            {/* {selectedValue ? selectedValue.value : placeholder} */}
            {placeholder}
          </SelectTitle>
          <FontAwesome5
            name='angle-down'
            size={26}
            color={selectedValue ? '#6441A5' : '#AEAEB3'}
          />
        </ComboBox>
        <Modal 
          animationType='slide'
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        >
          <ModalContent colors={[ '#6C33A3', '#8241B8' ]}>
            <ModalHeader>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
                style={{ }}
              >
                <FontAwesome
                  name='close'
                  size={30}
                  color={'#FFF'}
                />
              </TouchableOpacity>
              <ModalTitle>
                <Header 
                  title={header}
                  color='#FFF'
                />
              </ModalTitle>
            </ModalHeader>
            <ModalSelect>
              <FlatList 
                data={options ?? []}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => renderOption(item) }
                // ListEmptyComponent={() => console.log('vazio')}
              />
            </ModalSelect>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}