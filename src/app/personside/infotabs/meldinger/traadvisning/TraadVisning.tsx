import * as React from 'react';
import styled from 'styled-components/macro';
import { datoSynkende, formatterDatoMedMaanedsnavn, formatterDatoTid } from '../../../../../utils/date-utils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { toggleDialogpanel } from '../../../../../redux/uiReducers/UIReducer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { eldsteMelding, kanBesvares, meldingstittel, nyesteMelding, saksbehandlerTekst } from '../utils/meldingerUtils';
import { formaterDato } from '../../../../../utils/string-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { Printer } from '../../../../../utils/print/usePrinter';
import useFeatureToggle from '../../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';

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

function AlleMeldinger({ traad, sokeord }: { traad: Traad; sokeord: string }) {
    const meldingskomponenter = traad.meldinger
        .sort(datoSynkende((melding) => melding.opprettetDato))
        .map((melding, index) => {
            const meldingnummer = traad.meldinger.length - index;
            return (
                <EnkeltMelding sokeord={sokeord} melding={melding} key={melding.id} meldingsNummer={meldingnummer} />
            );
        });

    return <ol aria-label="Dialog">{meldingskomponenter}</ol>;
}

function Topplinje({ valgtTraad }: { valgtTraad: Traad }) {
    const dispatch = useDispatch();
    const dialogpanelTraad = useAppState((state) => state.oppgaver.dialogpanelTraad);
    const usingSFBackend = useFeatureToggle(FeatureToggles.BrukSalesforceDialoger).isOn ?? false;

    const traadKanBesvares = kanBesvares(usingSFBackend, valgtTraad);
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

    if (melding.sendtTilSladding) {
        return <AlertStripeInfo>Tråden ligger til behandling for sladding</AlertStripeInfo>;
    }
    if (usingSFBackend && melding.avsluttetDato !== undefined) {
        return <AlertStripeInfo>Henvendelsen er avsluttet</AlertStripeInfo>;
    }

    const handleNyMelding = () => {
        valgtTraad && dispatch(setValgtTraadDialogpanel(valgtTraad));
        dispatch(toggleDialogpanel(true));
        loggEvent('Ny melding knapp', 'Meldinger');
    };

    if (dialogpanelTraad === valgtTraad) {
        return (
            <KnappWrapper>
                <AlertStripeInfo>Under arbeid</AlertStripeInfo>
            </KnappWrapper>
        );
    }

    if (traadKanBesvares) {
        return (
            <KnappWrapper>
                <Hovedknapp onClick={handleNyMelding}>Ny melding</Hovedknapp>
            </KnappWrapper>
        );
    } else {
        return null;
    }
}

function TraadVisning(props: Props) {
    const sisteMelding = nyesteMelding(props.valgtTraad);

    return (
        <VisningStyle>
            <Topplinje valgtTraad={props.valgtTraad} />
            <h3 className="sr-only" aria-live="polite">
                {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
            </h3>
            <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
