import * as React from 'react';
import { Varsel as VarselModell, Varseltype } from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/dateUtils';
import VarselMeldinger from './varselDetaljer/VarselMeldinger';
import styled from 'styled-components';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';
import VisMerChevron from '../../../../components/VisMerChevron';
import { formaterDato } from '../../../../utils/stringFormatting';
import { useAppState } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisVarsel } from '../../../../redux/varsler/varslerReducer';
import { loggError } from '../../../../utils/frontendLogger';

const Style = styled.li`
    ${theme.hvittPanel};
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

function getVarselTekst(varsel: VarselModell) {
    const varselTekst = Varseltype[varsel.varselType];

    if (!varselTekst) {
        const ukjentNøkkelTekst = 'Ukjent nøkkel: ' + varsel.varselType;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    return varselTekst;
}

function Varsel({ varsel }: { varsel: VarselModell }) {
    const open = useAppState(state => state.varsler.aapneVarsler).includes(varsel);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => dispatch(toggleVisVarsel(varsel, open));
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende(melding => melding.utsendingsTidspunkt));

    const toggleOpen = () => setOpen(!open);

    const distinkteKommunikasjonsKanaler = new Set(sortertMeldingsliste.map(melding => melding.kanal));
    const kommunikasjonskanaler = (
        <Kommaliste aria-label="Kommunikasjonskanaler">
            {Array.from(distinkteKommunikasjonsKanaler).map(kanal => (
                <Normaltekst tag="li" key={kanal}>
                    {kanal}
                </Normaltekst>
            ))}
        </Kommaliste>
    );

    const varselTekst = getVarselTekst(varsel);
    return (
        <Style aria-label={varselTekst}>
            <HeaderStyle onClick={toggleOpen}>
                <Normaltekst>{formaterDato(varsel.mottattTidspunkt)}</Normaltekst>
                <Element>{varselTekst}</Element>
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
        </Style>
    );
}

export default React.memo(Varsel);
