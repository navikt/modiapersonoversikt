import { guid } from 'nav-frontend-js-utils';
import React, { useRef } from 'react';
import { UnmountClosed } from 'react-collapse';
import { useDispatch } from 'react-redux';
import VisMerChevron from '../../../../components/VisMerChevron';
import { toggleVisVarsel } from '../../../../redux/varsler/varslerReducer';
import { useAppState } from '../../../../utils/customHooks';
import styled from 'styled-components/macro';
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
    -ms-grid-columns: 6rem 55% 1fr auto;
    grid-template-columns: 6rem minmax(35%, 55%) 1fr auto;
    > *:nth-child(1) {
        -ms-grid-column: 1;
    }
    > *:nth-child(2) {
        -ms-grid-column: 2;
    }
    > *:nth-child(3) {
        -ms-grid-column: 3;
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

export interface VarselRowProps {
    varsel: UnifiedVarsel;
    datoer: Array<string>;
    tittel: string;
    kanaler: Array<string>;
    children: React.ReactNode;
}
export function VarselRow(props: VarselRowProps) {
    const tittelId = useRef(guid());
    const open = useAppState((state) => state.varsler.aapneVarsler).includes(props.varsel);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => dispatch(toggleVisVarsel(props.varsel, open));
    const toggleOpen = () => setOpen(!open);

    const datoer = props.datoer.map((dato) => <DatoSpan key={dato}>{dato}</DatoSpan>);

    return (
        <li>
            <StyledPanel>
                <article aria-labelledby={tittelId.current}>
                    <HeaderStyle onClick={toggleOpen}>
                        <Normaltekst>{datoer}</Normaltekst>
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
