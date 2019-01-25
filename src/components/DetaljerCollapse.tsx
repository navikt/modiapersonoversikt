import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import { FlexEnd } from './common-styled-components';
import EkspanderKnapp from './EkspanderKnapp';

interface Props {
    open: boolean;
    toggle: () => void;
    children: ReactNode;
    header?: ReactNode;
    tittel?: string;
}

const Wrapper = styled.div<{ open: boolean; hasHeader: boolean }>`
  transition: .5s;
  padding: ${props => props.hasHeader ? theme.margin.px20 : `0 ${theme.margin.px20} ${theme.margin.px20}`};
  ${props => props.open && theme.gråttPanel};
  ${props => props.open && !props.hasHeader && `margin-top: ${theme.margin.px20}`};
`;

const CollapseAnimasjon = styled.div<{ open: boolean }>`
  transition: .5s;
  padding: 0 ${theme.margin.px20};
  ${props => props.open && 'padding: 0'};
`;

const PaddingRight = styled.div`
  margin-right: ${theme.margin.px20};
`;

const PaddingBottom = styled.div`
  margin-bottom: ${theme.margin.px20};
`;

const SkjulVedPrint = styled.div`
  @media print {
    display: none;
  }
`;

function DetaljerCollapse(props: Props) {
    const knapp = (
        <SkjulVedPrint>
            <FlexEnd>
                <EkspanderKnapp
                    onClick={props.toggle}
                    open={props.open}
                    tittel={props.tittel}
                />
            </FlexEnd>
        </SkjulVedPrint>
    );

    return (
        <>
            {!props.header && <PaddingRight>{knapp}</PaddingRight>}
            <Wrapper
                open={props.open}
                hasHeader={props.header !== undefined}
            >
                {props.header}
                {props.header && <PaddingBottom>{knapp}</PaddingBottom>}
                <CollapseAnimasjon open={props.open}>
                    <UnmountClosed isOpened={props.open}>
                        {props.children}
                    </UnmountClosed>
                </CollapseAnimasjon>
                {props.open && <div aria-hidden={true}>{knapp}</div>}
            </Wrapper>
        </>
    );
}

/* Testet og testet for å funke med skjermleser. Gjør du endringer? Test nøye med skjermleser! */
export default DetaljerCollapse;
