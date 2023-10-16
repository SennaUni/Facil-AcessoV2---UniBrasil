import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  padding: 0 20px;
  margin: 10px 0;
`;

export const ButtonDetails = styled.TouchableOpacity`
  align-items: center;
  background-color: #8241B8;
  border-radius: 15px;
  padding: 10px;
`

export const DeatilsText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`

export const ModalContent = styled(LinearGradient)`
  flex: 1;
`

export const ModalHeader = styled.View`
  flex: 1;
  align-items: flex-end;
  padding: 12px;
`;

export const ModalButtons = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ModalDeatils = styled.View`
  flex: 2;
  background-color: #FFF;
`

export const Icon = styled(LinearGradient)`
  height: 60px;
  width: 60px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 8px 5px;
`;

export const Title = styled.Text`
  padding: 20px 0 10px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #8241B8;
`;

export const SubTitle = styled.Text`
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #8241B8;
`;

export const Text = styled.Text`
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
`;

export const CommentText = styled(Text)`
  text-align: center;
`;

export const RowView = styled.View`
  flex-direction: row;
  padding: 0 40px;
  justify-content: flex-start;
  align-items: center;
`

