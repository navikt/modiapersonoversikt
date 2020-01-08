import * as React from 'react';
import styled from 'styled-components/macro';
import { datoSynkende, formatterDatoMedMaanedsnavn, formatterDatoTid } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { toggleDialogpanel } from '../../../../../redux/uiReducers/UIReducer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import { eldsteMelding, meldingstittel, nyesteMelding, saksbehandlerTekst } from '../utils/meldingerUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { useEffect } from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { Printer } from '../../../../../utils/UsePrinter';
import { Element, Normaltekst } from 'nav-frontend-typografi';
interface Props {
    valgtTraad: Traad;
    sokeord: string;
    printer: Printer;
}

const VisningStyle = styled.section`
    padding: ${theme.margin.layout};
    flex-grow: 1;
    > *:last-child {
        margin-top: ${theme.margin.layout};
    }
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
const StyledPrintTekst = styled.div`
    display: none;
    @media print {
        display: inline-block;
        margin-bottom: 1rem;
    }
`;
const KanBesvaresMeldingstyper = [Meldingstype.SPORSMAL_MODIA_UTGAAENDE, Meldingstype.SPORSMAL_SKRIFTLIG];

function AlleMeldinger({ traad, sokeord }: { traad: Traad; sokeord: string }) {
    const meldingskomponenter = traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding sokeord={sokeord} melding={melding} key={melding.id} />);

    return <ol aria-label="Dialog">{meldingskomponenter}</ol>;
}

function Topplinje({ valgtTraad }: { valgtTraad: Traad }) {
    const dispatch = useDispatch();
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);

    const melding = eldsteMelding(valgtTraad);
    if (melding.erFerdigstiltUtenSvar) {
        return (
            <AlertStripeInfo>
                Henvendelsen er avsluttet uten å svare bruker av {saksbehandlerTekst(melding.ferdigstiltUtenSvarAv)}{' '}
                {melding.ferdigstiltUtenSvarDato && formatterDatoMedMaanedsnavn(melding.ferdigstiltUtenSvarDato)}
            </AlertStripeInfo>
        );
    }

    if (melding.markertSomFeilsendtAv) {
        return (
            <AlertStripeInfo>
                Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
            </AlertStripeInfo>
        );
    }

    const handleNyMelding = () => {
        valgtTraad && dispatch(setValgtTraadDialogpanel(valgtTraad));
        dispatch(toggleDialogpanel(true));
    };

    if (dialogpanelTraad === valgtTraad) {
        return (
            <KnappWrapper>
                <AlertStripeInfo>Under arbeid</AlertStripeInfo>
            </KnappWrapper>
        );
    }

    if (KanBesvaresMeldingstyper.includes(melding.meldingstype)) {
        return (
            <KnappWrapper>
                <Hovedknapp onClick={handleNyMelding}>Ny melding</Hovedknapp>
            </KnappWrapper>
        );
    } else {
        return null;
    }
}
function PrintTekst({ valgtTraad }: { valgtTraad: Traad }) {
    const melding = eldsteMelding(valgtTraad);

    const ferdigstiltUtenSvar = melding.erFerdigstiltUtenSvar && (
        <Normaltekst>
            {' '}
            Henvendelsen er avsluttet uten å svare bruker av {saksbehandlerTekst(melding.ferdigstiltUtenSvarAv)}{' '}
            {melding.ferdigstiltUtenSvarDato && formatterDatoMedMaanedsnavn(melding.ferdigstiltUtenSvarDato)}{' '}
        </Normaltekst>
    );
    const feilsendt = melding.markertSomFeilsendtAv && (
        <Normaltekst>
            {' '}
            Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
            {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}{' '}
        </Normaltekst>
    );
    const kontorsperre = melding.kontorsperretAv && <Element>Kontorsperret: {melding.kontorsperretEnhet}</Element>;
    return (
        <StyledPrintTekst>
            <Element>Kanal: NAV_NO</Element>
            {ferdigstiltUtenSvar}
            {feilsendt}
            {kontorsperre}
        </StyledPrintTekst>
    );
}

function TraadVisning(props: Props) {
    useEffect(() => {
        loggEvent('VisTraad', 'Meldinger');
    }, [props.valgtTraad]);

    const sisteMelding = nyesteMelding(props.valgtTraad);
    const PrinterWrapper = props.printer.printerWrapper;

    return (
        <VisningStyle>
            <Topplinje valgtTraad={props.valgtTraad} />
            <h3 className="sr-only" aria-live="polite" aria-atomic="false">
                Valgt melding - {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
            </h3>
            <PrinterWrapper>
                <PrintTekst valgtTraad={props.valgtTraad} />
                <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
            </PrinterWrapper>
        </VisningStyle>
    );
}

export default TraadVisning;
