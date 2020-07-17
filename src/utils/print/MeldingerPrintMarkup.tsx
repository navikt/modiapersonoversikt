import * as React from 'react';
import { Melding, Traad } from '../../models/meldinger/meldinger';
import { useFødselsnummer } from '../customHooks';
import {
    eldsteMelding,
    erJournalfort,
    meldingstittel
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { Element, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { datoStigende, formatterDatoMedMaanedsnavn, formatterDatoTid } from '../date-utils';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { formaterDato } from '../string-utils';
import Tekstomrade from 'nav-frontend-tekstomrade';

interface Props {
    valgtTraad: Traad;
}

const StyledTraad = styled.div`
    @media not print {
        display: none;
    }
`;

const Topptekst = styled.div`
    margin-bottom: 2rem;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0rem;
`;

const StyledInnhold = styled.div`
    > * {
        margin-bottom: 1rem !important;
    }
`;

const StyledEnkeltMelding = styled.div`
    margin-bottom: 2rem;
    border-bottom: ${theme.border.skille};
    page-break-inside: avoid;
`;
function EnkeltMeldingMarkup({ melding }: { melding: Melding }) {
    const journalfortDato = erJournalfort(melding) && (
        <Element> Journalført: {melding.journalfortDato && formaterDato(melding.journalfortDato)} </Element>
    );
    const journalfortTema = erJournalfort(melding) && (
        <Element>Journalført med team: {melding.journalfortTemanavn}</Element>
    );
    const fnr = useFødselsnummer();
    const tittel = meldingstittel(melding);
    const temagruppe = melding.temagruppe && <Element>Temagruppe: {melding.temagruppe}</Element>;

    const lest = melding.lestDato ? (
        <Normaltekst>Lest: {formatterDatoTid(melding.lestDato)}</Normaltekst>
    ) : (
        <Normaltekst>Ulest</Normaltekst>
    );

    return (
        <StyledEnkeltMelding>
            <Ingress>{tittel}</Ingress>
            <Flex>
                <div>
                    <Element>Kanal: NAV_NO</Element>
                    <Element>Type: {melding.meldingstype}</Element>
                    {temagruppe}
                    {journalfortDato}
                    {journalfortTema}
                </div>
                <div>
                    <Element>Fødselsnummer: {fnr}</Element>
                    <Normaltekst>
                        Mottatt/Sendt: {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                    </Normaltekst>
                    {lest}
                </div>
            </Flex>
            <StyledInnhold>
                <Element>Innhold:</Element>
                <Tekstomrade>{melding.fritekst}</Tekstomrade>
            </StyledInnhold>
        </StyledEnkeltMelding>
    );
}

function MeldingerPrintMarkup(props: Props) {
    const melding = eldsteMelding(props.valgtTraad);

    const ferdigstiltUtenSvar = melding.erFerdigstiltUtenSvar && (
        <Element>
            Henvendelsen er avsluttet uten å svare bruker{' '}
            {melding.ferdigstiltUtenSvarDato && formatterDatoMedMaanedsnavn(melding.ferdigstiltUtenSvarDato)}{' '}
        </Element>
    );
    const feilsendt = melding.markertSomFeilsendtAv && (
        <Element> Markert som feilsendt av {melding.markertSomFeilsendtAv.ident?.toUpperCase()}</Element>
    );
    const kontorsperre = melding.kontorsperretAv && <Element>Kontorsperret for {melding.kontorsperretEnhet}</Element>;
    const enkeltmeldinger = props.valgtTraad.meldinger
        .sort(datoStigende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMeldingMarkup melding={melding} key={melding.id} />);
    return (
        <StyledTraad>
            <Topptekst>
                {ferdigstiltUtenSvar}
                {feilsendt}
                {kontorsperre}
            </Topptekst>
            {enkeltmeldinger}
        </StyledTraad>
    );
}

export default MeldingerPrintMarkup;
