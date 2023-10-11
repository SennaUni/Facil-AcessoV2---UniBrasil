import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  overflow: hidden;
  border-radius: 50px;
`;

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  opacity: ${ props => props.loading ? 0.7 : 1 };
`
