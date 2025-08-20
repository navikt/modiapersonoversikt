import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';
import EnkeltMelding from 'src/app/personside/infotabs/meldinger/traadvisning/Enkeltmelding';
import {
    nyesteMelding,
    saksbehandlerTekst,
    traadKanBesvares,
    traadstittel
} from 'src/app/personside/infotabs/meldinger/utils/meldingerUtils';
import { useDialogpanelState } from 'src/context/dialogpanel-state';
import type { Traad } from 'src/models/meldinger/meldinger';
import { setValgtTraadDialogpanel } from 'src/redux/oppgave/actions';
import theme from 'src/styles/personOversiktTheme';
import { useAppState } from 'src/utils/customHooks';
import { datoSynkende, formatterDato, formatterDatoTid } from 'src/utils/date-utils';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import type { Printer } from 'src/utils/print/usePrinter';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';

interface Props {
    valgtTraad: Traad;
    sokeord: string;
    printer: Printer;
}

const VisningStyle = styled.section`
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

const TopplinjeTittel = styled(Undertittel)`
    margin-bottom: 0.3rem;
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    margin-bottom: 0.3rem;
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
    const dialogpanel = useDialogpanelState();
    const dialogpanelTraad = useAppState((state) => state.oppgaver.dialogpanelTraad);

    const kanBesvares = traadKanBesvares(valgtTraad);
    const melding = nyesteMelding(valgtTraad);
    const avsluttetDato = valgtTraad.avsluttetDato || melding.avsluttetDato;

    if (melding.markertSomFeilsendtAv || melding.sendtTilSladding || (avsluttetDato && !kanBesvares)) {
        return (
            <>
                {melding.markertSomFeilsendtAv && (
                    <StyledAlertStripeInfo>
                        Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                        {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                    </StyledAlertStripeInfo>
                )}
                {melding.sendtTilSladding && (
                    <StyledAlertStripeInfo>Tråden ligger til behandling for sladding</StyledAlertStripeInfo>
                )}
                {avsluttetDato && !kanBesvares && <StyledAlertStripeInfo>Samtalen er avsluttet</StyledAlertStripeInfo>}
            </>
        );
    }

    const handleNyMelding = () => {
        if (valgtTraad) dispatch(setValgtTraadDialogpanel(valgtTraad));
        dialogpanel.setApent(true);
        loggEvent('Ny melding knapp', 'Meldinger');
    };

    if (dialogpanelTraad?.traadId === valgtTraad.traadId) {
        return <StyledAlertStripeInfo>Under arbeid</StyledAlertStripeInfo>;
    }

    if (kanBesvares) {
        return (
            <KnappWrapper>
                <Hovedknapp onClick={handleNyMelding}>Ny melding</Hovedknapp>
            </KnappWrapper>
        );
    }
    return null;
}

const StyledJournalforingPanel = styled(Ekspanderbartpanel)`
    margin-top: 0.8rem;
    .ekspanderbartPanel__hode,
    .ekspanderbartPanel__innhold {
        padding: 0.1rem 0.2rem;
    }
    .ekspanderbartPanel__tittel {
        color: ${theme.color.lenke};
    }
    @media print {
        display: none;
    }
`;

function Journalposter(props: { traad: Traad }) {
    const journalposter = props.traad.journalposter;
    if (journalposter.isEmpty()) {
        return null;
    }

    const content = journalposter.map((journalpost, idx) => {
        const navn = journalpost.journalfortAv?.navn ?? 'ukjent';
        const dato = formatterDato(journalpost.journalfortDato);
        const tema = journalpost.journalfortTemanavn;
        const saksid = journalpost.journalfortSaksid ? `saksid ${journalpost.journalfortSaksid}` : 'ukjent saksid';

        return <Normaltekst key={idx}>{`${dato}: Journalført på ${tema} (${saksid}) av ${navn}`}</Normaltekst>;
    });

    return (
        <StyledJournalforingPanel
            tittel={<UndertekstBold>Dialogen er journalfort på {journalposter.length} sak(er)</UndertekstBold>}
            border={false}
        >
            {content}
        </StyledJournalforingPanel>
    );
}

function TraadVisning(props: Props) {
    const sisteMelding = nyesteMelding(props.valgtTraad);

    return (
        <VisningStyle>
            <Panel>
                <TopplinjeTittel>{traadstittel(props.valgtTraad)}</TopplinjeTittel>
                <Topplinje valgtTraad={props.valgtTraad} />
                <h3 className="sr-only" aria-live="polite">
                    {traadstittel(props.valgtTraad)} {formatterDatoTid(sisteMelding.opprettetDato)}
                </h3>
                <Journalposter traad={props.valgtTraad} />
            </Panel>
            <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
