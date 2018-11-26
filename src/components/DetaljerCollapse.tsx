import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import { FlexEnd } from './common-styled-components';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    open: boolean;
    toggle: () => void;
    children: ReactNode;
    header?: ReactNode;
    tittel?: string;
}

const Wrapper = styled<{ open: boolean; hasHeader: boolean }, 'div'>('div')`
  transition: .5s;
  padding: ${props => props.hasHeader ? theme.margin.px20 : `0 ${theme.margin.px20} ${theme.margin.px20}`};
  ${props => props.open && theme.ekspandert};
  ${props => props.open && !props.hasHeader && `margin-top: ${theme.margin.px20}`};
`;

const CollapseAnimasjon = styled<{ open: boolean }, 'div'>('div')`
  transition: .5s;
  padding: 0 ${theme.margin.px20};
  ${props => props.open && 'padding: 0'};
`;

const KnappWrapper = styled<{ open: boolean }, 'button'>('button')`
  border: none;
  padding: .1rem .2rem;
  margin-top: ${props => props.open && '1rem'};
  border-radius: ${theme.borderRadius.knapp};
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  color: ${theme.color.lenke};
  &:focus {
    ${theme.focus}
  }
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
 @media print {
    display: none;
 }
`;

const Luft = styled.span`
  margin-right: .5rem;
`;

interface KnappProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    tittel?: string;
}

function DetaljerKnapp(props: KnappProps) {
    return (
        <KnappWrapper
            onClick={props.onClick}
            aria-expanded={props.open}
            open={props.open}
        >
            <Luft>
                <Normaltekst tag="span">
                    {props.open ? 'Skjul' : 'Vis'} {props.tittel || 'detaljer'}
                </Normaltekst>
            </Luft>
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'}/>
        </KnappWrapper>
    );
}

function DetaljerCollapse(props: Props) {
    return (
        <Wrapper open={props.open} hasHeader={props.header !== undefined}>
            {props.header}
            <CollapseAnimasjon open={props.open}>
                <UnmountClosed isOpened={props.open}>
                    {props.children}
                </UnmountClosed>
            </CollapseAnimasjon>
            <FlexEnd>
                <DetaljerKnapp
                    onClick={props.toggle}
                    open={props.open}
                    tittel={props.tittel}
                />
            </FlexEnd>
        </Wrapper>
    );
}

export default DetaljerCollapse;
