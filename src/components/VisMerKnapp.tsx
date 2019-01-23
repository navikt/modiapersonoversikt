import * as React from 'react';
import { theme } from '../styles/personOversiktTheme';
import styled, { css } from 'styled-components';
import { HoyreChevron } from 'nav-frontend-chevron';

const Wrapper = styled.div<{ valgt: boolean }>`
    padding: ${theme.margin.px20};
    display: flex;
    align-items: center;
    cursor: pointer;
    ${props => props.valgt && css`background-color: ${theme.color.kategori};`}
    &:hover {
      ${theme.hover};
      > button:last-child {
        padding-left: .5rem;
      }
    }
    > *:first-child {
        flex-grow: 1;
    }
`;

const Knapp = styled.button`
  border: none;
  padding: 0;
  height: 2rem;
  width: 2rem;
  border-radius: ${theme.borderRadius.knapp};
  cursor: pointer;
  background-color: transparent;
  transition: padding-left .3s;
  &:focus {
    ${theme.focus}
  }
`;

interface Props {
    onClick: (event: React.MouseEvent) => void;
    valgt: boolean;
    children: React.ReactNode;
    ariaDescription: string;
}

function VisMerKnapp(props: Props) {
    return (
        <Wrapper valgt={props.valgt} onClick={props.onClick}>
            {props.children}
            <Knapp onClick={props.onClick} aria-selected={props.valgt} aria-label={props.ariaDescription}>
                <HoyreChevron stor={true}/>
            </Knapp>
        </Wrapper>
    );
}

export default VisMerKnapp;
