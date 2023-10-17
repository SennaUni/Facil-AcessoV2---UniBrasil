import React, { useState } from 'react';

import { TextInputProps } from 'react-native'

import { Feather } from '@expo/vector-icons';

import { Control, Controller } from 'react-hook-form';

import { Container, IconContainer, RenderContainer, InputText, ErrorContainer, Error, InputContainer } from './styles';

export interface InputProps extends TextInputProps {
  name: string
  icon: string
  defaultValue?: string
  control: Control
}

export function Input({ name, icon, defaultValue, control, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  const handleInputFocus = () => setIsFocused(true)

  const handleInputFilled = (value: string) => setIsFilled(!!value)

  return (
    <>
      <Container >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <RenderContainer>
              <InputContainer>
                <IconContainer
                  isFocused={isFocused}
                >
                  <Feather
                    name={icon as any}
                    size={24}
                    color={(isFocused || isFilled) ? '#6441A5' : '#AEAEB3'}
                  />
                </IconContainer>
                <InputText
                  onChangeText={(value: string) => {
                    onChange(value)
                    handleInputFilled(value)
                  }}
                  value={value}
                  onFocus={handleInputFocus}
                  isFocused={isFocused}
                  {...rest}
                />
              </InputContainer>
              
              {errors[name] &&
                <ErrorContainer>
                  <Feather
                    name="alert-triangle"
                    size={24}
                    color="#DC1637"
                  />
                  <Error>{errors[name].message}</Error>
                </ErrorContainer>
              }
            </RenderContainer>
          )}
        />
      </Container>
    </>
  );
}
