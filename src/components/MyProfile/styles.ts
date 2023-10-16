import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  width: 100%;
  padding: 0 25px 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background-color: #FFF;
`;

export const Image = styled.View`
  height: 150px;
  width: 150px;
  border-radius: 100px;
  overflow: hidden;
`

export const Content = styled.View`
  padding: 40px 15px 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
`

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  margin: 10px 0 10px 15px;
  font-weight: bold;
  font-size: 32px;
  color: #6C33A3;
`

export const Label = styled.Text`
  margin: 10px 0 0 0;
  font-weight: bold;
  font-size: 14px;
  color: #8241B8;
`

export const Value = styled.Text`
  margin: 5px 0 0 10px; 
  font-weight: bold;
  font-size: 20px;
  color: #6C33A3;
`