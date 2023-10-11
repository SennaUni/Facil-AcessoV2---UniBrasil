import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-top: 10px;
  padding: 10px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 0 10px;

  color: ${ props => props.color ? props.color : '#808080' };
`;

export const Line = styled.View`
  flex: 1;
  border-bottom-width: .5px; 

  border-color: ${ props => props.color ? props.color : '#808080' };
`
