import React from 'react';

import { Container, Subtitle, Title } from './styles';

export type HeaderParams = {
  title: string
  subTitle?: String
  color?: string
}

export function Header({ title, subTitle, color }: HeaderParams) {
  return (
    <Container>
      <Title color={color}>
        {title}
      </Title>
      
      {subTitle && (
        <Subtitle color={color}>
          {subTitle}
        </Subtitle>
      )}

    </Container>
  )
}