import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';

export const AlignTextRight = styled.div`
  text-align: right;
`;

export const AlignTextCenter = styled.div`
  text-align: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Uppercase = styled.span`
  text-transform: uppercase;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

const Opacity = styled.span`
  opacity: 1; // TODO Fjern denne
`;

export function UndertekstGrå(props: { children: ReactNode }) {
    return <Undertekst><Opacity>{props.children}</Opacity></Undertekst>;
}

export function UndertekstGråBold(props: { children: ReactNode }) {
    return <UndertekstBold><Opacity>{props.children}</Opacity></UndertekstBold>;
}
