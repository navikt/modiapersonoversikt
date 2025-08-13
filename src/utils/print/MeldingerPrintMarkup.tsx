import Tekstomrade, { defaultRules } from 'nav-frontend-tekstomrade';
import { Element, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { meldingstittel } from 'src/app/personside/infotabs/meldinger/utils/meldingerUtils';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Melding, MeldingJournalpost, Traad } from 'src/models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { datoStigende, formatterDato, formatterDatoTid } from '../date-utils';
import { rule as sladdRule } from '../sladdrule';
import { formaterDato } from '../string-utils';

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

function JournalposterMarkup(props: { journalposter: Array<MeldingJournalpost> }) {
    if (props.journalposter.isEmpty()) {
        return null;
    }
    const journalposter = props.journalposter.map((journalpost, idx) => {
        const dato = formatterDato(journalpost.journalfortDato);
        const tema = journalpost.journalfortTemanavn;
        const saksid = journalpost.journalfortSaksid ? `saksid ${journalpost.journalfortSaksid}` : 'ukjent saksid';

        return <Normaltekst key={idx}>{`${dato}: ${tema} (${saksid})`}</Normaltekst>;
    });

    return (
        <>
            <Element>Journalført:</Element>
            {journalposter}
        </>
    );
}

function EnkeltMeldingMarkup({ melding }: { melding: Melding }) {
    const fnr = usePersonAtomValue();
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
                    <Element>Skrevet av: {melding.skrevetAvTekst}</Element>
                    <Element>Kanal: NAV_NO</Element>
                    <Element>Type: {melding.meldingstype}</Element>
                    {temagruppe}
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
                <Tekstomrade rules={[sladdRule, ...defaultRules]}>{melding.fritekst}</Tekstomrade>
            </StyledInnhold>
        </StyledEnkeltMelding>
    );
}

function MeldingerPrintMarkup(props: Props) {
    const meldinger = props.valgtTraad.meldinger.sort(datoStigende((melding) => melding.opprettetDato));
    const eldsteMelding = meldinger[0];

    const feilsendt = eldsteMelding.markertSomFeilsendtAv && (
        <Element> Markert som feilsendt av {eldsteMelding.markertSomFeilsendtAv.ident?.toUpperCase()}</Element>
    );
    const journalposter = <JournalposterMarkup journalposter={props.valgtTraad.journalposter} />;
    const enkeltmeldinger = meldinger.map((melding) => <EnkeltMeldingMarkup melding={melding} key={melding.id} />);
    return (
        <StyledTraad>
            <Topptekst>
                {feilsendt}
                {journalposter}
            </Topptekst>
            {enkeltmeldinger}
        </StyledTraad>
    );
}

export default MeldingerPrintMarkup;
