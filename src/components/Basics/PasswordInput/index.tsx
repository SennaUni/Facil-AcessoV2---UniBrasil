import React, { useState } from 'react';

import { TextInputProps, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Control, Controller } from 'react-hook-form';

import { Container, IconContainer, InputText, ErrorContainer, Error, RenderContainer, InputContainer } from './styles';

export interface InputProps extends TextInputProps {
  name: string
  icon: string
  defaultValue?: string
  control: Control
}

export function PasswordInput({ name, icon, defaultValue, control, ...rest }: InputProps) {

  const [secutiryText, setSecurityText] = useState<boolean>(true);
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
                  secureTextEntry={secutiryText}
                  {...rest}
                />
                {isFilled && (
                  <IconContainer isFocused={isFocused}>
                    <TouchableOpacity
                      onPress={() => setSecurityText(!secutiryText)}
                    >
                      <Feather
                        name={secutiryText ? 'eye' : 'eye-off'}
                        size={24}
                        color={'#6441A5'}
                      />
                    </TouchableOpacity>
                  </IconContainer>
                )}
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