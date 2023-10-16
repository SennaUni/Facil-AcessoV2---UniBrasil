import React from 'react';

import { Toast } from '../Toast';

import { FlatList, View, Text } from 'react-native';

import { Container } from './styles';

export function ToastContainer({ messages, removeToast }) {
  return (
    <Container>
      {messages && messages.map(message => (
        <Toast
          key={message.id}
          message={message}
          removeToast={() => removeToast(message.id)}
        />
      ))}
    </Container>
  )
};