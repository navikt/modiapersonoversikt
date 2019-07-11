import * as React from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';
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
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { UnmountClosed } from 'react-collapse';
import OpprettOppgaveContainer from '../oppgave/OpprettOppgaveContainer';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { RadioPanelGruppe } from 'nav-frontend-skjema';

interface Props {
    lukkPanel: () => void;
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

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter(melding => !erMeldingFeilsendt(melding)).map(melding => melding.id);
}

function lagMeldingsidListe(traad: Traad) {
    return traad.meldinger.map(melding => melding.id);
}

function MerkPanel(props: Props) {
    const dispatch = useDispatch();
    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [opprettOppgave, settOpprettOppgave] = useState(true);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = useSelector((state: AppState) => state.meldinger.valgtTraad);
    const merkAvslutt = useSelector((state: AppState) => state.restResources.merkAvslutt);
    const merkBidrag = useSelector((state: AppState) => state.restResources.merkBidrag);
    const merkFeilsendt = useSelector((state: AppState) => state.restResources.merkFeilsendt);
    const merkKontorsperret = useSelector((state: AppState) => state.restResources.merkKontorsperret);
    const merkSlett = useSelector((state: AppState) => state.restResources.merkSlett);

    if (!valgtTraad) {
        return <AlertStripeAdvarsel>Ingen tråd valgt</AlertStripeAdvarsel>;
    }

    const melding = eldsteMelding(valgtTraad);

    const enableStandardValg =
        !erEldsteMeldingJournalfort(valgtTraad) &&
        !erFeilsendt(valgtTraad) &&
        !erBehandlet(valgtTraad) &&
        !erKontorsperret(valgtTraad);
    const enableBidrag = !erKommunaleTjenester(melding.temagruppe) && enableStandardValg;
    const enableFerdigstillUtenSvar =
        erMeldingSpørsmål(melding.meldingstype) &&
        !erKontorsperret(valgtTraad) &&
        !erBehandlet(valgtTraad) &&
        !harDelsvar(valgtTraad);
    const enableSlett =
        harTilgangTilSletting() && (erSamtalereferat(melding.temagruppe) || erMeldingSpørsmål(melding.meldingstype));

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        switch (valgtOperasjon) {
            case MerkOperasjon.AVSLUTT:
                dispatch(
                    merkAvslutt.actions.post({
                        saksbehandlerValgtEnhet: getSaksbehandlerEnhet(),
                        eldsteMeldingOppgaveId: eldsteMelding(valgtTraad).oppgaveId,
                        eldsteMeldingTraadId: valgtTraad.traadId
                    })
                );
                break;
            case MerkOperasjon.BISYS:
                dispatch(merkBidrag.actions.post({ eldsteMeldingTraadId: eldsteMelding(valgtTraad).id }));
                break;
            case MerkOperasjon.FEILSENDT:
                dispatch(merkFeilsendt.actions.post({ behandlingsidListe: lagBehandlingskjede(valgtTraad) }));
                break;
            case MerkOperasjon.KONTORSPERRET:
                break;
            case MerkOperasjon.SLETT:
                dispatch(merkSlett.actions.post({ behandlingsidListe: lagBehandlingskjede(valgtTraad) }));
                break;
        }
        props.lukkPanel();
    };

    function kontorsperring() {
        if (!valgtTraad) {
            return;
        }
        dispatch(
            merkKontorsperret.actions.post({ fnr: valgtBrukersFnr, meldingsidListe: lagMeldingsidListe(valgtTraad) })
        );
        props.lukkPanel();
    }

    return (
        <form onSubmit={submitHandler}>
            <RadioPanelGruppe
                radios={[
                    { label: 'Merk som feilsendt', value: MerkOperasjon.FEILSENDT, disabled: !enableStandardValg },
                    { label: 'Kopiert inn i Bisys', value: MerkOperasjon.BISYS, disabled: enableBidrag },
                    { label: 'Kontorsperret', value: MerkOperasjon.KONTORSPERRET, disabled: !enableStandardValg },
                    {
                        label: 'Avslutt uten å svare bruker',
                        value: MerkOperasjon.AVSLUTT,
                        disabled: !enableFerdigstillUtenSvar
                    },
                    { label: 'Merk for sletting', value: MerkOperasjon.SLETT, disabled: !enableSlett }
                ]}
                name={'merk'}
                checked={valgtOperasjon}
                legend={''}
                onChange={(_, value) => settValgtOperasjon(MerkOperasjon[value])}
            />
            <UnmountClosed isOpened={valgtOperasjon === MerkOperasjon.KONTORSPERRET}>
                <Checkbox
                    label={'Opprett oppgave'}
                    checked={opprettOppgave}
                    onChange={_ => settOpprettOppgave(!opprettOppgave)}
                />
                <UnmountClosed isOpened={opprettOppgave}>
                    <OpprettOppgaveContainer lukkPanel={() => {}} kontorsperreFunksjon={kontorsperring} />
                </UnmountClosed>
            </UnmountClosed>
            {valgtOperasjon === MerkOperasjon.KONTORSPERRET && opprettOppgave ? null : ( // Bruk knapp i oppgavepanel
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Merk</Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            )}
        </form>
    );
}

export default MerkPanel;
