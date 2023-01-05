import * as React from 'react';
import styled from 'styled-components/macro';
import { datoSynkende, formatterDato, formatterDatoTid } from '../../../../../utils/date-utils';
import NyEnkeltMelding from './NyEnkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Traad, TraadType } from '../../../../../models/meldinger/meldinger';
import { eldsteMelding, kanBesvares, meldingstittel, nyesteMelding, saksbehandlerTekst } from '../utils/meldingerUtils';
import { formaterDato } from '../../../../../utils/string-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { Printer } from '../../../../../utils/print/usePrinter';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import { useDialogpanelState } from '../../../../../context/dialogpanel-state';

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
    text-align: right;
`;

const TopplinjeWrapper = styled.div`
    background: white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
`;

const TopplinjeTittel = styled(Undertittel)`
    margin-bottom: 0.3rem;
`;

const StyledAlertStripeInfo = styled(AlertStripeInfo)`
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

function AlleMeldinger({ traad, sokeord }: { traad: Traad; sokeord: string }) {
    const meldingskomponenter = traad.meldinger
        .sort(datoSynkende((melding) => melding.opprettetDato))
        .map((melding, index) => {
            const meldingnummer = traad.meldinger.length - index;
            return (
                <NyEnkeltMelding sokeord={sokeord} melding={melding} key={melding.id} meldingsNummer={meldingnummer} />
            );
        });

    return <ol aria-label="Dialog">{meldingskomponenter}</ol>;
}

function Topplinje({ valgtTraad }: { valgtTraad: Traad }) {
    const dispatch = useDispatch();
    const dialogpanel = useDialogpanelState();
    const dialogpanelTraad = useAppState((state) => state.oppgaver.dialogpanelTraad);

    const traadKanBesvares = kanBesvares(valgtTraad);
    const melding = eldsteMelding(valgtTraad);

    if (melding.markertSomFeilsendtAv || melding.sendtTilSladding || (melding.avsluttetDato && !traadKanBesvares)) {
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
                {melding.avsluttetDato && !traadKanBesvares && (
                    <StyledAlertStripeInfo>Dialogen er avsluttet</StyledAlertStripeInfo>
                )}
            </>
        );
    }

    const handleNyMelding = () => {
        valgtTraad && dispatch(setValgtTraadDialogpanel(valgtTraad));
        dialogpanel.setApent(true);
        loggEvent('Ny melding knapp', 'Meldinger');
    };

    if (dialogpanelTraad?.traadId === valgtTraad.traadId) {
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

function traadTittel(traadType?: TraadType) {
    switch (traadType) {
        case TraadType.CHAT:
            return 'Chat med NAV';
        case TraadType.MELDINGSKJEDE:
            return 'Samtale med NAV';
        case TraadType.SAMTALEREFERAT:
            return 'Referat med NAV';
        default:
            return '';
    }
}

function NyTraadVisning(props: Props) {
    const sisteMelding = nyesteMelding(props.valgtTraad);

    return (
        <VisningStyle>
            <TopplinjeWrapper>
                <TopplinjeTittel>{traadTittel(props.valgtTraad.traadType)}</TopplinjeTittel>
                <Topplinje valgtTraad={props.valgtTraad} />
                <h3 className="sr-only" aria-live="polite">
                    {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
                </h3>
                <Journalposter traad={props.valgtTraad} />
            </TopplinjeWrapper>
            <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default NyTraadVisning;
