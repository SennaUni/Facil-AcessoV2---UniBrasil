import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
`

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`

export const Icon = styled(LinearGradient)`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 5px 30px;
  background-color: #6441A5;
`

export const Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  max-width: 100px;
` 