import * as React from 'react';
import styled from 'styled-components/macro';
import { datoSynkende, formatterDato, formatterDatoTid } from '../../../../../utils/date-utils';
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
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi';

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

    const traadKanBesvares = kanBesvares(valgtTraad);
    const melding = eldsteMelding(valgtTraad);

    if (melding.markertSomFeilsendtAv || melding.sendtTilSladding || (melding.avsluttetDato && !traadKanBesvares)) {
        return (
            <>
                {melding.markertSomFeilsendtAv && (
                    <AlertStripeInfo>
                        Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                        {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                    </AlertStripeInfo>
                )}
                {melding.sendtTilSladding && (
                    <AlertStripeInfo>Tråden ligger til behandling for sladding</AlertStripeInfo>
                )}
                {melding.avsluttetDato && !traadKanBesvares && <AlertStripeInfo>Dialogen er avsluttet</AlertStripeInfo>}
            </>
        );
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

const StyledJournalforingPanel = styled(Ekspanderbartpanel)`
    margin-top: 0.5rem;
    .ekspanderbartPanel__hode,
    .ekspanderbartPanel__innhold {
        padding: 0.3rem 1rem;
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

    const content = journalposter.map((journalpost) => {
        const navn = journalpost.journalfortAv?.navn ?? 'ukjent';
        const dato = formatterDato(journalpost.journalfortDato);
        const tema = journalpost.journalfortTemanavn;
        const saksid = journalpost.journalfortSaksid ? `saksid ${journalpost.journalfortSaksid}` : 'ukjent saksid';

        return <Normaltekst>{`${dato}: Knyttet til ${tema} (${saksid}) av ${navn}`}</Normaltekst>;
    });

    return (
        <StyledJournalforingPanel
            tittel={<UndertekstBold>Dialogen er knyttet til {journalposter.length} sak(er)</UndertekstBold>}
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
            <Topplinje valgtTraad={props.valgtTraad} />
            <h3 className="sr-only" aria-live="polite">
                {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
            </h3>
            <Journalposter traad={props.valgtTraad} />
            <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
