import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background-color: #FFF;
`;

export const Content = styled.View`
  opacity: ${props => props.opacity};
  height: ${props => props.height};
`
