import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex-direction: row;
  padding: 0 20px;
  margin: 10px 0 0;
`;

export const ComboBox = styled.TouchableOpacity`
  flex: 1;
  background-color: #FFFFFF;
  color: #7A7A80;
  padding: 0 23px;
  border-bottom-width: 1px;
  border-bottom-color: #6441A5; 
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconContainer = styled.View`
  height: 50px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-bottom-width: 1px;
  border-bottom-color: #6441A5;  
`;

export const ModalContent = styled(LinearGradient)`
  flex: 1;
`

export const ModalHeader = styled.View`
  flex: 1;
  align-items: flex-end;
  padding: 12px;
`;

export const ModalTitle = styled.View`
  flex: 1;
  align-self: flex-start;
  justify-content: center;
`

export const SelectTitle = styled.Text`
  color: ${ props => props.color};
  font-size: 14px;
  width: 90%;
`;

export const ModalSelect = styled.View`
  flex: 2;
  padding: 12px;
  background-color: #FFF;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;
