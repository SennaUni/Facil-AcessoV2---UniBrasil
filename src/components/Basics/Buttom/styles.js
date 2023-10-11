import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled(LinearGradient)`
  margin: 20px 10px;
  border-radius: 25px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  flex-direction: row;
  border-radius: 20px;
  margin-top: 10px;

  opacity: ${ props => props.loading ? 0.6 : 1 };
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  margin: 0 8px;
`;