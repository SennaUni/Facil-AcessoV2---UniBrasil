import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View``

export const Header = styled.Text`
  justify-content: center;
  align-items: flex-start;
  margin: 15px 0;
  margin-left: 25px;
  font-size : 22px;
  font-weight: bold;
  
  color : ${props => props.color};
`

export const Content = styled.View`
  align-items: center;
`

export const Icon = styled(LinearGradient)`
  height: 60px;
  width: 60px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 8px 5px;
  background-color: #6441A5;
`

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  max-width: 90px;
  text-align: center;

  color : ${props => props.color};
` 