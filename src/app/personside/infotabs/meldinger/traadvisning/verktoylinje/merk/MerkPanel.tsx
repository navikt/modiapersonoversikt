import * as React from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { useSelector } from 'react-redux';
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
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { UnmountClosed } from 'react-collapse';
import OpprettOppgaveContainer from '../oppgave/OpprettOppgaveContainer';
import { RadioPanelGruppe, Checkbox } from 'nav-frontend-skjema';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';

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

const MERK_AVSLUTT_URL = `${apiBaseUri}/dialogmerking/avslutt`;
const MERK_BISYS_URL = `${apiBaseUri}/dialogmerking/bidrag`;
const MERK_FEILSENDT_URL = `${apiBaseUri}/dialogmerking/feilsendt`;
const MERK_KONTORSPERRET_URL = `${apiBaseUri}/dialogmerking/kontorsperret`;
const MERK_SLETT_URL = `${apiBaseUri}/dialogmerking/slett`;

function lagBehandlingskjede(traad: Traad) {
    return traad.meldinger.filter(melding => !erMeldingFeilsendt(melding)).map(melding => melding.id);
}

function lagMeldingsidListe(traad: Traad) {
    return traad.meldinger.map(melding => melding.id);
}

function MerkPanel(props: Props) {
    const [valgtOperasjon, settValgtOperasjon] = useState<MerkOperasjon | undefined>(undefined);
    const [opprettOppgave, settOpprettOppgave] = useState(true);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;

    const melding = eldsteMelding(valgtTraad);

    const disableStandardvalg =
        erEldsteMeldingJournalfort(valgtTraad) ||
        erFeilsendt(valgtTraad) ||
        erBehandlet(valgtTraad) ||
        erKontorsperret(valgtTraad);
    const disableBidrag = !erKommunaleTjenester(melding.temagruppe) || disableStandardvalg;
    const disableFerdigstillUtenSvar =
        !erMeldingSpørsmål(melding.meldingstype) ||
        erKontorsperret(valgtTraad) ||
        erBehandlet(valgtTraad) ||
        harDelsvar(valgtTraad);
    const enableSlett =
        harTilgangTilSletting() && (erSamtalereferat(melding.temagruppe) || erMeldingSpørsmål(melding.meldingstype));

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        switch (valgtOperasjon) {
            case MerkOperasjon.AVSLUTT:
                post(MERK_AVSLUTT_URL, {
                    fnr: valgtBrukersFnr,
                    saksbehandlerValgtEnhet: getSaksbehandlerEnhet(),
                    eldsteMeldingOppgaveId: eldsteMelding(valgtTraad).oppgaveId,
                    eldsteMeldingTraadId: valgtTraad.traadId
                });
                break;
            case MerkOperasjon.BISYS:
                post(MERK_BISYS_URL, { fnr: valgtBrukersFnr, eldsteMeldingTraadId: eldsteMelding(valgtTraad).id });
                break;
            case MerkOperasjon.FEILSENDT:
                post(MERK_FEILSENDT_URL, { fnr: valgtBrukersFnr, behandlingsidListe: lagBehandlingskjede(valgtTraad) });
                break;
            case MerkOperasjon.KONTORSPERRET:
                break;
            case MerkOperasjon.SLETT:
                post(MERK_SLETT_URL, { fnr: valgtBrukersFnr, behandlingsidListe: lagBehandlingskjede(valgtTraad) });
                break;
        }
        props.lukkPanel();
    };

    function kontorsperring() {
        if (!valgtTraad) {
            return;
        }
        post(MERK_KONTORSPERRET_URL, { fnr: valgtBrukersFnr, meldingsidListe: lagMeldingsidListe(valgtTraad) });
        props.lukkPanel();
    }

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
