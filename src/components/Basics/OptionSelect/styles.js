import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 25px;
  padding: 10px;

  background-color: ${props => props.backGround};
`;

export const Picture = styled(FontAwesome)`
  height: 40px;
  width: 40px;
  border-radius: 25px;
  margin-right: 12px;
  justify-content: center;
  text-align: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${props => props.color}
`;
