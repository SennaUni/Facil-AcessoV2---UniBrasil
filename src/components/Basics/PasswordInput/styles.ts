import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';


export const Container = styled.View`
  flex-direction: row;
  padding: 0 20px;
  margin: 5px 0;
`;

export const IconContainer = styled.View`
  height: 50px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-bottom-width: 1px;
  border-bottom-color: #6441A5;  
  
  ${({ isFocused }) => isFocused && css`
    border-bottom-width: 3px; 
  `};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  background-color: #FFFFFF;
  /* color: #7A7A80; */
  color: #000;
  padding: 0 23px;
  border-bottom-width: 1px;
  border-bottom-color: #6441A5;  

  ${({ isFocused }) => isFocused && css`
    border-bottom-width: 3px;  
  `};
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0 5px;  
  padding: 0 20px;
`

export const Error = styled.Text`
  margin-left: 5px;
  color: #DC1637;
`