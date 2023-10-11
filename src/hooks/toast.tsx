import 'react-native-get-random-values';

import React, { createContext, useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ToastContainer } from '../components/ToastContainer';

export type ToastContextType = {
  addToast: (params: ToastParams) => void;
  removeToast: (id: typeof uuidv4) => void;
};

const ToastContex = createContext<ToastContextType | undefined>(undefined);

export type ToastParams = {
  title: string
  description: string
  type: 'success' | 'warning' | 'error'
}

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  function addToast({ type, title, description }: ToastParams) {

    const toast = {
      id: uuidv4(),
      type,
      title,
      description,
    };

    setMessages((state) => [...state, toast]);
  };

  function removeToast(id: typeof uuidv4) {
    setMessages(messages => messages.filter(currentMessage => currentMessage.id !== id));
  };

  return (
    <ToastContex.Provider value={{ addToast, removeToast }}>
      <ToastContainer
        messages={messages}
        removeToast={removeToast}
      />
      {children}
    </ToastContex.Provider>
  )
}

const useToast = () => {
  const contex = useContext(ToastContex);

  if (!contex) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return contex;
}

export { ToastProvider, useToast };