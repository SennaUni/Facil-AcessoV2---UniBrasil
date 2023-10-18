import React, { useState, useCallback, useEffect } from 'react';

import { TouchableOpacity, Modal, FlatList } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Control, Controller } from 'react-hook-form';

import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

import { Header } from '../../Header';

import { Container, ComboBox, IconContainer, ModalContent, ModalHeader, ModalTitle, ModalSelect, SelectTitle, ErrorContainer, Error, InputContainer, ErrorContent } from './styles';

export type SelectParam = {
  label?: string
  control: Control
  name: string
  icon: any
  options: any
  placeholder: string
  header: any
  OptionComponent: any
  onChange: any
  defaultValue?: SelectedValueType
}

type SelectedValueType = {
  id: string
  value: string
  icon: string
}

export function Select({ icon, control, name, defaultValue, options, placeholder, header, OptionComponent, onChange }: SelectParam) {

  const [openModal, setOpenModal] = useState(false)
  const [selectedValue, setSelectedValue] = useState<SelectedValueType | undefined>(defaultValue)

  useFocusEffect(
    useCallback(() => {
      setSelectedValue(undefined)
    }, [])
  )

  function renderOption(item: SelectedValueType) {
    return (
      <OptionComponent
        item={item}
        selectedValue={selectedValue}
        onPress={() => {
          setSelectedValue(item)
          onChange(name, item)
          setOpenModal(false)
        }}
      />
    )
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ formState: { errors } }) => (
          <Container >
            <InputContainer>
              <IconContainer
                isFocused={selectedValue}
              >
                <FontAwesome
                  name={icon}
                  size={24}
                  color={selectedValue ? '#6441A5' : '#AEAEB3'}
                />
              </IconContainer>

              <ComboBox
                onPress={() => setOpenModal(true)}
                isFocused={selectedValue}
              >
                <SelectTitle
                  numberOfLines={1}
                  color={selectedValue ? '#000' : '#AEAEB3'}
                >
                  {selectedValue ? selectedValue.value : placeholder}
                </SelectTitle>
                <FontAwesome5
                  name='angle-down'
                  size={26}
                  color={selectedValue ? '#6441A5' : '#AEAEB3'}
                />
              </ComboBox>
            </InputContainer>

            {errors[name] && (
              <ErrorContainer>
                <ErrorContent>
                  <Feather
                    name="alert-triangle"
                    size={24}
                    color="#DC1637"
                  />
                  <Error> {errors[name].message} </Error>
                </ErrorContent>
              </ErrorContainer>
            )}

            <Modal
              animationType='slide'
              visible={openModal}
              onRequestClose={() => setOpenModal(false)}
            >
              <ModalContent colors={['#6C33A3', '#8241B8']}>
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
                    renderItem={({ item }) => renderOption(item)}
                  // ListEmptyComponent={() => console.log('vazio')}
                  />
                </ModalSelect>
              </ModalContent>
            </Modal>
          </Container>
        )}
      />
    </>
  );
}