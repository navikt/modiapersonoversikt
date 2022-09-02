import * as React from 'react';
import {
    Varsel as VarselModell,
    Varseltype,
    UnifiedVarsel as UnifiedVarselModell,
    DittNavEvent,
    isDittNavEvent
} from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/date-utils';
import VarselMeldinger from './varselDetaljer/VarselMeldinger';
import styled from 'styled-components/macro';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';
import { ENDASH, formaterDato } from '../../../../utils/string-utils';
import { useAppState } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisVarsel } from '../../../../redux/varsler/varslerReducer';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';

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

const GraattDefinisjonsListe = styled.dl`
    ${theme.graattPanel}
    dt {
        float: left;
        clear: left;
        font-weight: bold;
        margin-bottom: 0.5rem;
        width: 7rem;
    }
    dd {
        margin-bottom: 0.5rem;
        margin-left: 7.125rem;
    }
`;
const DatoSpan = styled.span`
    display: block;
`;
const EllipsisElement = styled(Element)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

function getVarselTekst(varsel: VarselModell) {
    const varselTekst = Varseltype[varsel.varselType];

    if (!varselTekst) {
        const ukjentNøkkelTekst = 'Ukjent nøkkel: ' + varsel.varselType;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    return varselTekst;
}

function emptyReplacement(text: string | null | undefined, replacement: string): string {
    if (text === null || text === undefined || text === '') {
        return replacement;
    }
    return text;
}

interface VarselRowProps {
    varsel: UnifiedVarselModell;
    datoer: Array<string>;
    tittel: string;
    kanaler: Array<string>;
    children: React.ReactNode;
}
function VarselRow(props: VarselRowProps) {
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

function DittNavEventVarsel({ varsel }: { varsel: DittNavEvent }) {
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const datoer = [formaterDato(varsel.forstBehandlet)];
    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];

    return (
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <GraattDefinisjonsListe>
                <dt>Produsert av:</dt>
                <dd>{emptyReplacement(varsel.produsent, ENDASH)}</dd>

                <dt>Tekst:</dt>
                <dd>{emptyReplacement(varsel.tekst, ENDASH)}</dd>

                <dt>Link:</dt>
                <dd>{emptyReplacement(varsel.link, ENDASH)}</dd>
            </GraattDefinisjonsListe>
        </VarselRow>
    );
}

function Varsel({ varsel }: { varsel: VarselModell }) {
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende((melding) => melding.utsendingsTidspunkt));
    const datoer = sortertMeldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)).unique();
    const tittel = getVarselTekst(varsel);
    const kanaler = sortertMeldingsliste.map((melding) => melding.kanal).unique();

    return (
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <VarselMeldinger sortertMeldingsliste={sortertMeldingsliste} />
        </VarselRow>
    );
}

function UnifiedVarsel({ varsel }: { varsel: UnifiedVarselModell }) {
    if (isDittNavEvent(varsel)) {
        return <DittNavEventVarsel varsel={varsel} />;
    }
    return <Varsel varsel={varsel} />;
}

export default React.memo(UnifiedVarsel);
