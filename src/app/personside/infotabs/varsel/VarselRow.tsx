import { guid } from 'nav-frontend-js-utils';
import { useRef } from 'react';
import * as React from 'react';
import { UnmountClosed } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';
import CompletedIcon from '../../../../svg/CompletedIcon';
import WarningIcon from '../../../../svg/WarningIcon';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import theme from '../../../../styles/personOversiktTheme';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { UnifiedVarsel } from '../../../../models/varsel';

const StyledPanel = styled(Panel)`
    padding: 0rem;
`;

const HeaderStyle = styled.div`
    position: relative;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 6rem 3rem 55% 1fr auto;
    grid-template-columns: 6rem 3rem minmax(35%, 55%) 1fr auto;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
    }
    > *:nth-child(4) {
        -ms-grid-column: 4;
    }
    align-items: center;
    border-radius: ${theme.borderRadius.layout};
    cursor: pointer;
    &:hover {
        ${theme.hover}
    }
    > * {
        padding: 0.7rem;
    }
`;

const Kommaliste = styled.ul`
    li {
        display: inline-block;
    }
    li:not(:last-child) {
        &:after {
            content: ',';
            margin-right: 0.5em;
        }
    }
`;

const DatoSpan = styled.span`
    display: flex;
`;
const EllipsisElement = styled(Element)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const IkonDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface VarselRowProps {
    varsel: UnifiedVarsel;
    datoer: Array<string>;
    tittel: string;
    kanaler: Array<string>;
    children: React.ReactNode;
    harFeilteVarsel?: boolean;
}
export function VarselRow(props: VarselRowProps) {
    const tittelId = useRef(guid());
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);

    const datoer = props.datoer.map((dato) => <DatoSpan key={dato}>{dato}</DatoSpan>);

    return (
        <li>
            <StyledPanel>
                <article aria-labelledby={tittelId.current}>
                    <HeaderStyle onClick={toggleOpen}>
                        <Normaltekst>{datoer}</Normaltekst>
                        <IkonDiv>{props.harFeilteVarsel ? <WarningIcon /> : <CompletedIcon />}</IkonDiv>
                        <EllipsisElement id={tittelId.current} tag="h4">
                            {props.tittel}
                        </EllipsisElement>
                        <Kommaliste aria-label="Kommunikasjonskanaler">
                            {props.kanaler.map((kanal) => (
                                <Normaltekst tag="li" key={kanal}>
                                    {kanal}
                                </Normaltekst>
                            ))}
                        </Kommaliste>
                        <VisMerChevron
                            focusOnRelativeParent={true}
                            onClick={toggleOpen}
                            open={open}
                            title={(open ? 'Skjul' : 'Vis') + ' mer informasjon om varsel/notifikasjon'}
                        />
                    </HeaderStyle>
                    <UnmountClosed isOpened={open}>{props.children}</UnmountClosed>
                </article>
            </StyledPanel>
        </li>
    );
}
