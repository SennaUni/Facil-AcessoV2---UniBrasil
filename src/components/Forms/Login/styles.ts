import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 0 25px 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background-color: #FFF;
`;

export const Options = styled.View`
  justify-content: center;
  align-items: center;
`

export const OptionsText = styled.Text`
  font-size: 15px;
  margin-top: 20px;
  font-weight: bold;

  color: ${ props => props.color ? props.color : '#7A7A80' };
`

export const LoginContainer = styled.View `
  padding-bottom: 20px;
  padding-top: 10px;
`

export const Logins = styled.View `
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
