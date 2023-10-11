import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  width: 85%;
  padding: 10px 10px 5px;
  border-radius: 25px;
  align-self: center;
  margin: 40px 0 5px;
  background-color: #FFF;
`;

export const Icon = styled(LinearGradient)`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 8px 5px;
`;

export const Header = styled.Text`
  text-align : center;
  color: #8241B8;
  font-size: 20px;
  font-weight: bold;
  padding-top: 15px;
`

export const Content = styled.View`
  flex-direction : row;
  justify-content: space-between;
  padding: 0 10px;
`

export const Address = styled.View`
  flex-direction : row; 
  align-items: center; 
  max-width: 270px;
`

export const AddressText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`

export const Buttons = styled.View`
  padding-left : 15px;
  padding-bottom: 5px;
`

export const IconButton = styled.TouchableOpacity`
  padding: 10px;
`
