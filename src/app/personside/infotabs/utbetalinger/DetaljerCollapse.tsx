import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import { FlexEnd } from '../../../../components/common-styled-components';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    open: boolean;
    toggle: () => void;
    children: ReactNode;
}

const Wrapper = styled<{ open: boolean }, 'div'>('div')`
  transition: .5s;
  padding: 0 ${theme.margin.px20} ${theme.margin.px20};
  ${props => props.open && theme.ekspandert};
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
  }
`;

const Luft = styled.span`
  margin-right: .5rem;
`;

interface KnappProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
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
                    {props.open ? 'Skjul' : 'Vis'} detaljer
                </Normaltekst>
            </Luft>
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'}/>
        </KnappWrapper>
    );
}

function DetaljerCollapse(props: Props) {
    return (
        <Wrapper open={props.open}>
            <CollapseAnimasjon open={props.open}>
                <UnmountClosed isOpened={props.open}>
                    {props.children}
                </UnmountClosed>
            </CollapseAnimasjon>
            <FlexEnd>
                <DetaljerKnapp
                    onClick={props.toggle}
                    open={props.open}
                />
            </FlexEnd>
        </Wrapper>
    );
}

export default DetaljerCollapse;
