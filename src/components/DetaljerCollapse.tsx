import type { ReactNode } from 'react';
import { UnmountClosed } from 'react-collapse';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import { FlexEnd } from './common-styled-components';
import EkspanderKnapp from './EkspanderKnapp';

interface Props {
    open: boolean;
    toggle: () => void;
    children: ReactNode;
    header?: ReactNode;
    alwaysGrayBackground?: boolean;
    tittel?: string;
}

const Styling = styled.div<{
    open: boolean;
    hasHeader: boolean;
    alwaysGrayBackground: boolean;
}>`
    transition: 0.5s;
    padding: ${(props) => (props.hasHeader ? theme.margin.px20 : `0 ${theme.margin.px20} ${theme.margin.px20}`)};
    ${(props) => (props.open || props.alwaysGrayBackground) && theme.graattPanel};
    ${(props) => props.open && !props.hasHeader && `margin-top: ${theme.margin.px20}`};
`;

const CollapseAnimasjon = styled.div<{ open: boolean }>`
    transition: 0.5s;
    padding: 0 ${theme.margin.px20};
    ${(props) => props.open && 'padding: 0'};
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
                <EkspanderKnapp onClick={props.toggle} open={props.open} tittel={props.tittel} />
            </FlexEnd>
        </SkjulVedPrint>
    );

    return (
        <>
            {!props.header && <PaddingRight>{knapp}</PaddingRight>}
            <Styling
                open={props.open}
                hasHeader={props.header !== undefined}
                alwaysGrayBackground={props.alwaysGrayBackground === undefined ? false : props.alwaysGrayBackground}
            >
                {props.header}
                {props.header && <PaddingBottom>{knapp}</PaddingBottom>}
                <CollapseAnimasjon open={props.open}>
                    <UnmountClosed isOpened={props.open}>{props.children}</UnmountClosed>
                </CollapseAnimasjon>
                {props.open && <div aria-hidden={true}>{knapp}</div>}
            </Styling>
        </>
    );
}

/* Testet og testet for å funke med skjermleser. Gjør du endringer? Test nøye med skjermleser! */
export default DetaljerCollapse;
