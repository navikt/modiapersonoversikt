import * as React from 'react';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import {
    eldsteMelding,
    erBehandlet,
    erEldsteMeldingJournalfort,
    erFeilsendt,
    erKommunaleTjenester,
    erKontorsperret,
    erMeldingFeilsendt,
    erMeldingSpørsmål,
    erSamtalereferat,
    harDelsvar,
    harTilgangTilSletting
} from '../../../utils/meldingerUtils';
import { Melding, Meldingstype, Traad } from '../../../../../../../models/meldinger/meldinger';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import {
    MerkAvsluttUtenSvarRequest,
    MerkRequestMedBehandlingskjede,
    MerkRequestMedTraadId
} from '../../../../../../../models/meldinger/merk';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { loggError } from '../../../../../../../utils/frontendLogger';
import { Resultat } from '../utils/VisPostResultat';
import { Kontorsperr } from './Kontorsperr';
import { useRestResource } from '../../../../../../../utils/customHooks';

interface Props {
    lukkPanel: () => void;
    valgtTraad: Traad;
}

enum MerkOperasjon {
    FEILSENDT = 'FEILSENDT',
    BISYS = 'BISYS',
    KONTORSPERRET = 'KONTORSPERRET',
    AVSLUTT = 'AVSLUTT',
    SLETT = 'SLETT'
}

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const MERK_AVSLUTT_URL = `${apiBaseUri}/dialogmerking/avslutt`;
const MERK_BISYS_URL = `${apiBaseUri}/dialogmerking/bidrag`;
const MERK_FEILSENDT_URL = `${apiBaseUri}/dialogmerking/feilsendt`;
const MERK_SLETT_URL = `${apiBaseUri}/dialogmerking/slett`;

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter(melding => !erMeldingFeilsendt(melding)).map(melding => melding.id);
}

function visStandardvalg(valgtTraad: Traad) {
    return (
        !erEldsteMeldingJournalfort(valgtTraad) &&
        !erFeilsendt(valgtTraad) &&
        erBehandlet(valgtTraad) &&
        !erKontorsperret(valgtTraad)
    );
}

function visFerdigstillUtenSvar(meldingstype: Meldingstype, valgtTraad: Traad) {
    return (
        erMeldingSpørsmål(meldingstype) &&
        !erKontorsperret(valgtTraad) &&
        !erBehandlet(valgtTraad) &&
        !harDelsvar(valgtTraad)
    );
}

function skalViseSletting(melding: Melding) {
    return harTilgangTilSletting() && (erSamtalereferat(melding.temagruppe) || erMeldingSpørsmål(melding.meldingstype));
}

function getMerkAvsluttRequest(fnr: string, traad: Traad): MerkAvsluttUtenSvarRequest {
    return {
        fnr: fnr,
        saksbehandlerValgtEnhet: getSaksbehandlerEnhet(),
        eldsteMeldingOppgaveId: eldsteMelding(traad).oppgaveId,
        eldsteMeldingTraadId: traad.traadId
    };
}

function getMerkBisysRequest(fnr: string, traad: Traad): MerkRequestMedTraadId {
    return {
        fnr: fnr,
        eldsteMeldingTraadId: eldsteMelding(traad).id
    };
}

function getMerkBehandlingskjedeRequest(fnr: string, traad: Traad): MerkRequestMedBehandlingskjede {
    return {
        fnr: fnr,
        behandlingsidListe: lagBehandlingskjede(traad)
    };
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const traaderSelector = useRestResource(resources => resources.tråderOgMeldinger);
    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;

    const melding = eldsteMelding(valgtTraad);

    const disableStandardvalg = !visStandardvalg(valgtTraad);
    const disableBidrag = !(!erKommunaleTjenester(melding.temagruppe) && visStandardvalg(valgtTraad));
    const disableFerdigstillUtenSvar = !visFerdigstillUtenSvar(melding.meldingstype, valgtTraad);
    const disableSlett = !skalViseSletting(melding);

    const submitHandler = (event: FormEvent) => {
        setSubmitting(true);
        event.preventDefault();
        switch (valgtOperasjon) {
            case MerkOperasjon.AVSLUTT:
                merkPost(MERK_AVSLUTT_URL, getMerkAvsluttRequest(valgtBrukersFnr, valgtTraad));
                break;
            case MerkOperasjon.BISYS:
                merkPost(MERK_BISYS_URL, getMerkBisysRequest(valgtBrukersFnr, valgtTraad));
                break;
            case MerkOperasjon.FEILSENDT:
                merkPost(MERK_FEILSENDT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad));
                break;
            case MerkOperasjon.KONTORSPERRET: // Håndteres i egen funksjon
                break;
            case MerkOperasjon.SLETT:
                merkPost(MERK_SLETT_URL, getMerkBehandlingskjedeRequest(valgtBrukersFnr, valgtTraad));
                break;
        }
    };

    function merkPost(url: string, object: any) {
        post(url, object)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
                dispatch(traaderSelector.actions.reload);
            })
            .catch((error: Error) => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
                loggError(error, 'Klarte ikke merke trååd', object);
            });
    }

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

    const tilbake = () => {
        settValgtOperasjon(undefined);
    };

    if (valgtOperasjon === MerkOperasjon.KONTORSPERRET) {
        return (
            <Kontorsperr
                valgtTraad={props.valgtTraad}
                tilbake={tilbake}
                lukkPanel={props.lukkPanel}
                merkPost={merkPost}
            />
        );
    } else {
        return (
            <form onSubmit={submitHandler}>
                <RadioPanelGruppe
                    radios={[
                        { label: 'Merk som feilsendt', value: MerkOperasjon.FEILSENDT, disabled: disableStandardvalg },
                        { label: 'Kopiert inn i Bisys', value: MerkOperasjon.BISYS, disabled: disableBidrag },
                        { label: 'Kontorsperret', value: MerkOperasjon.KONTORSPERRET, disabled: disableStandardvalg },
                        {
                            label: 'Avslutt uten å svare bruker',
                            value: MerkOperasjon.AVSLUTT,
                            disabled: disableFerdigstillUtenSvar
                        },
                        { label: 'Merk for sletting', value: MerkOperasjon.SLETT, disabled: disableSlett }
                    ]}
                    name={'merk'}
                    checked={valgtOperasjon}
                    legend={''}
                    onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value])}
                />
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
}

export default MerkPanel;
