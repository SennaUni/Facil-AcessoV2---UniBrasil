import styled from 'styled-components/native';

import { TextProps } from 'react-native';

interface TitleProps extends TextProps {
  color?: string;
}

export const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 5px 24px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 40px;
  font-weight: bold;

  color: ${ props => props.color ? props.color : '#47474D' };
`;

export const Subtitle = styled.Text<TitleProps>`
  font-size: 15px;
  line-height: 25px;  

  color: ${ props => props.color ? props.color : '#47474D' };

`;