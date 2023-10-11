import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Feather } from '@expo/vector-icons';

import { useField } from '@unform/core'

import { Container, IconContainer, InputText, ErrorContainer, Error } from './styles';

export function Input({ name, icon,...rest }) {
  const inputRef = useRef(null)

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: ref => {
        return ref.value || ''
      },
      setValue: (ref, value) => {
        ref.setNativeProps({ text: value });
        ref.value = value
      },
      clearValue: ref => {
        ref.value = ''
      },
    })
  }, [fieldName, registerField])

  const handleChangeText = useCallback(text => {
    setIsFilled(true)
    if (text.length === 0) setIsFilled(false)
    if (inputRef.current) inputRef.current.value = text;
  }, []);

  return (
    <>
      <Container >
        <IconContainer 
          isFocused={isFocused}
          {...rest}
        >
          <Feather
            name={icon}
            size={24}
            color={(isFocused || isFilled) ? '#6441A5' : '#AEAEB3'}
          />
        </IconContainer>

        <InputText
          ref={inputRef}
          defaultValue={defaultValue}
          onChangeText={handleChangeText}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          isFocused={isFocused}
          {...rest}
        />
      </Container>
      { error && 
        <ErrorContainer>
           <Feather 
            name="alert-triangle" 
            size={24} 
            color="#DC1637"
          />
          <Error>{error}</Error>
        </ErrorContainer>}
    </>
  );
}