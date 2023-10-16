import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled(LinearGradient)`
    flex: 1;
`;

export const Header = styled.View`
    padding: 10px;
`

export const HeaderText = styled.Text`
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
    padding-top: 10px;
    padding-left: 5px;
`

export const HeaderImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #FFF;
`

export const DrawerOptions = styled.View`
    flex: 1;
`

export const Footer = styled.View`
    padding: 0 20px;
`

export const FooterButtons = styled.TouchableOpacity`
    flex-direction: row; 
    padding: 13px 0;
    align-items: center;
`

export const FooterText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #fff;
`