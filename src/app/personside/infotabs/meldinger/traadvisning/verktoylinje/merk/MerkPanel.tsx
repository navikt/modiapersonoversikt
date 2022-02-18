import * as React from 'react';
import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import {
    eldsteMelding,
    erBehandlet,
    erEldsteMeldingJournalfort,
    erFeilsendt,
    erKontorsperret,
    erMeldingFeilsendt
} from '../../../utils/meldingerUtils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { RadioPanelGruppe, RadioPanelProps } from 'nav-frontend-skjema';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { MerkRequestMedBehandlingskjede } from '../../../../../../../models/meldinger/merk';
import { AlertStripeFeil, AlertStripeAdvarsel, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Resultat } from '../utils/VisPostResultat';
import { useRestResource } from '../../../../../../../rest/consumer/useRestResource';
import { useFocusOnFirstFocusable } from '../../../../../../../utils/hooks/use-focus-on-first-focusable';
import { setIngenValgtTraadDialogpanel } from '../../../../../../../redux/oppgave/actions';
import useTildelteOppgaver from '../../../../../../../utils/hooks/useTildelteOppgaver';
import { Oppgave } from '../../../../../../../models/meldinger/oppgave';

interface Props {
    lukkPanel: () => void;
    valgtTraad: Traad;
}

enum MerkOperasjon {
    FEILSENDT = 'FEILSENDT',
    SLADDING = 'SLADDING'
}

const KnappStyle = styled.div`
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const InfoStyling = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const MERK_FEILSENDT_URL = `${apiBaseUri}/dialogmerking/feilsendt`;
const MERK_SLADDING_URL = `${apiBaseUri}/dialogmerking/sladding`;

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter((melding) => !erMeldingFeilsendt(melding)).map((melding) => melding.id);
}

function visStandardvalg(valgtTraad: Traad) {
    return (
        !erEldsteMeldingJournalfort(valgtTraad) &&
        !erFeilsendt(valgtTraad) &&
        erBehandlet(valgtTraad) &&
        !erKontorsperret(valgtTraad)
    );
}

function visTvungenFerdigstillelse(valgtTraad: Traad, tildelteOppgaver: Oppgave[]) {
    const oppgavenTildeltBruker = tildelteOppgaver.find((it) => it.traadId === valgtTraad.traadId);
    return erBehandlet(valgtTraad) && oppgavenTildeltBruker && oppgavenTildeltBruker.erSTOOppgave;
}

function getMerkBehandlingskjedeRequest(fnr: string, traad: Traad): MerkRequestMedBehandlingskjede {
    return {
        fnr: fnr,
        behandlingsidListe: lagBehandlingskjede(traad)
    };
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const traderResource = useRestResource((resources) => resources.traader);

    const reloadMeldinger = traderResource.actions.reload;
    const reloadTildelteOppgaver = useRestResource((resources) => resources.tildelteOppgaver).actions.reload;
    const tildelteOppgaver = useTildelteOppgaver();

    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;
    const formRef = useRef<HTMLFormElement>(null);

    useFocusOnFirstFocusable(formRef);

    const melding = eldsteMelding(valgtTraad);
    const disableStandardvalg = !visStandardvalg(valgtTraad);
    const disableTvungenFerdigstill = !visTvungenFerdigstillelse(valgtTraad, tildelteOppgaver.paaBruker);

    const callbackUtenOppgaveFerdigstilling = () => {
        dispatch(reloadMeldinger);
        dispatch(reloadTildelteOppgaver);
    };
    const resetDialogpanel = () => {
        dispatch(setIngenValgtTraadDialogpanel());
    };
    const merkPost = (url: string, object: any, name: string, callback: () => void) => {
        post(url, object, 'MerkPanel-' + name)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
                callback();
                resetDialogpanel();
            })
            .catch(() => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
            });
    };
    const merkPostUtenOppgaveFerdigstilling = (url: string, object: any, name: string) =>
        merkPost(url, object, name, callbackUtenOppgaveFerdigstilling);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!valgtOperasjon || submitting) {
            return;
        }
        setSubmitting(true);

        switch (valgtOperasjon) {
            case MerkOperasjon.FEILSENDT:
                merkPostUtenOppgaveFerdigstilling(
                    MERK_FEILSENDT_URL,
                    getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad),
                    'Feilsendt'
                );
                break;
            case MerkOperasjon.SLADDING:
                merkPostUtenOppgaveFerdigstilling(
                    MERK_SLADDING_URL,
                    { fnr: valgtBrukersFnr, traadId: valgtTraad.traadId },
                    'Sladding'
                );
                break;
        }
    };

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Tråd merket</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å merke tråd</AlertStripeFeil>
            );
        return (
            <AlertStyling>
                {alert}
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </AlertStyling>
        );
    }

    const radioprops: RadioPanelProps[] = [
        {
            label: 'Feilsendt post',
            value: MerkOperasjon.FEILSENDT,
            disabled: disableStandardvalg
        },
        {
            label: 'Send til sladding',
            value: MerkOperasjon.SLADDING,
            disabled: melding.sendtTilSladding
        }
    ];

    return (
        <form onSubmit={submitHandler} ref={formRef}>
            <RadioPanelGruppe
                radios={radioprops}
                name={'merk'}
                checked={valgtOperasjon}
                legend={''}
                onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value])}
            />
            {!disableTvungenFerdigstill && (
                <InfoStyling>
                    <AlertStripeInfo>
                        Dersom oppgaven allerede er besvart og avsluttet kan man benytte overstyrt ferdigstillelse av
                        oppgave
                    </AlertStripeInfo>
                </InfoStyling>
            )}
            {valgtOperasjon === MerkOperasjon.SLADDING && (
                <InfoStyling>
                    <AlertStripeAdvarsel>Årsak må meldes i porten</AlertStripeAdvarsel>
                </InfoStyling>
            )}
            <KnappStyle>
                <Hovedknapp htmlType="submit" spinner={submitting} autoDisableVedSpinner>
                    Merk
                </Hovedknapp>
                <LenkeKnapp type="button" onClick={props.lukkPanel}>
                    Lukk
                </LenkeKnapp>
            </KnappStyle>
        </form>
    );
}

export default MerkPanel;
