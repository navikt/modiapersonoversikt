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
import { formaterDato } from '../../../../utils/string-utils';
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

function getVarselTekst(varsel: VarselModell) {
    const varselTekst = Varseltype[varsel.varselType];

    if (!varselTekst) {
        const ukjentNøkkelTekst = 'Ukjent nøkkel: ' + varsel.varselType;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    return varselTekst;
}

function DittNavEventVarsel({ varsel }: { varsel: DittNavEvent }) {
    const open = useAppState((state) => state.varsler.aapneVarsler).includes(varsel);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => dispatch(toggleVisVarsel(varsel, open));
    const toggleOpen = () => setOpen(!open);

    const tittelId = useRef(guid());
    const aktiv = varsel.aktiv ? '' : '(Ferdigstilt)';
    return (
        <li>
            <StyledPanel>
                <article aria-labelledby={tittelId.current}>
                    <HeaderStyle onClick={toggleOpen}>
                        <Normaltekst>{formaterDato(varsel.sistOppdatert)}</Normaltekst>
                        <Element id={tittelId.current} tag="h4">
                            {varsel.tekst}
                        </Element>
                        <Kommaliste aria-label="Kommunikasjonskanaler">
                            <Normaltekst tag="li">NOTIFIKASJON {aktiv}</Normaltekst>
                        </Kommaliste>
                        <VisMerChevron
                            focusOnRelativeParent={true}
                            onClick={toggleOpen}
                            open={open}
                            title={(open ? 'Skjul' : 'Vis') + ' mer informasjon om notifikasjon'}
                        />
                    </HeaderStyle>
                    <UnmountClosed isOpened={open}>
                        <GraattDefinisjonsListe>
                            <dt>Produsert av:</dt>
                            <dd>{varsel.produsent}</dd>

                            <dt>Tekst:</dt>
                            <dd>{varsel.tekst}</dd>

                            <dt>Link:</dt>
                            <dd>{varsel.link}</dd>
                        </GraattDefinisjonsListe>
                    </UnmountClosed>
                </article>
            </StyledPanel>
        </li>
    );
}

function Varsel({ varsel }: { varsel: VarselModell }) {
    const open = useAppState((state) => state.varsler.aapneVarsler).includes(varsel);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => dispatch(toggleVisVarsel(varsel, open));
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende((melding) => melding.utsendingsTidspunkt));
    const tittelId = useRef(guid());

    const toggleOpen = () => setOpen(!open);

    const distinkteKommunikasjonsKanaler = new Set(sortertMeldingsliste.map((melding) => melding.kanal));
    const kommunikasjonskanaler = (
        <Kommaliste aria-label="Kommunikasjonskanaler">
            {Array.from(distinkteKommunikasjonsKanaler).map((kanal) => (
                <Normaltekst tag="li" key={kanal}>
                    {kanal}
                </Normaltekst>
            ))}
        </Kommaliste>
    );

    const varselTekst = getVarselTekst(varsel);
    const utsendingDatoListe = Array.from(
        new Set(sortertMeldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)))
    ).map((dato) => <DatoSpan key={dato}>{dato}</DatoSpan>);
    return (
        <li>
            <StyledPanel>
                <article aria-labelledby={tittelId.current}>
                    <HeaderStyle onClick={toggleOpen}>
                        <Normaltekst>{utsendingDatoListe}</Normaltekst>
                        <Element id={tittelId.current} tag="h4">
                            {varselTekst}
                        </Element>
                        {kommunikasjonskanaler}

                        <VisMerChevron
                            focusOnRelativeParent={true}
                            onClick={toggleOpen}
                            open={open}
                            title={(open ? 'Skul' : 'Vis') + ' meldinger'}
                        />
                    </HeaderStyle>
                    <UnmountClosed isOpened={open}>
                        <VarselMeldinger sortertMeldingsliste={sortertMeldingsliste} />
                    </UnmountClosed>
                </article>
            </StyledPanel>
        </li>
    );
}

function UnifiedVarsel({ varsel }: { varsel: UnifiedVarselModell }) {
    if (isDittNavEvent(varsel)) {
        return <DittNavEventVarsel varsel={varsel} />;
    }
    return <Varsel varsel={varsel} />;
}

export default React.memo(UnifiedVarsel);
