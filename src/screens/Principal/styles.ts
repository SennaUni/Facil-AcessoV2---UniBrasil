import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled(LinearGradient)`
  flex: 1;
  padding-top: 16px;
`;

export const Comments = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 15px;
`

export const CommentsText = styled.Text`
  margin: 0px 12px;
  text-align : center;
  color : #FFF;
  font-size : 28px;
  font-weight: bold;
`

export const Icon = styled(LinearGradient)`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 8px 5px;
`;

export const CommentsCards = styled.View`
  flex: 1;
  background-color: #F0F0F0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`