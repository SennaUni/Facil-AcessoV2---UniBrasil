import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Content = styled(LinearGradient)`
  flex: 1;
`;

export const HeaderTitle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FormView = styled.View`
  justify-content: flex-end;
  flex: 2;
`