import * as React from 'react';
import { useState } from 'react';
import { Resultat } from '../utils/VisPostResultat';
import { Checkbox } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import OpprettOppgaveContainer from '../oppgave/OpprettOppgaveContainer';
import { post } from '../../../../../../../api/api';
import { loggError } from '../../../../../../../utils/frontendLogger';
import { apiBaseUri } from '../../../../../../../api/config';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { MerkKontorsperrRequest } from '../../../../../../../models/meldinger/merk';
import styled from 'styled-components';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';

interface Props {
    valgtTraad: Traad;
    tilbake: () => void;
    lukkPanel: () => void;
}

const MERK_KONTORSPERRET_URL = `${apiBaseUri}/dialogmerking/kontorsperret`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const Style = styled.div`
    margin-top: 1rem;
`;

function getMerkKontrorsperretRequest(fnr: string, traad: Traad): MerkKontorsperrRequest {
    const meldingsidListe = traad.meldinger.map(melding => melding.id);
    return {
        fnr: fnr,
        meldingsidListe: meldingsidListe
    };
}

export function Kontorsperr(props: Props) {
    const [opprettOppgave, settOpprettOppgave] = useState(true);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;

    function merkPost(url: string, object: any) {
        post(url, object)
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                setSubmitting(false);
            })
            .catch((error: Error) => {
                settResultat(Resultat.FEIL);
                setSubmitting(false);
                loggError(error, 'Klarte ikke merke trååd', object);
            });
    }

    const kontorsperr = () => {
        merkPost(MERK_KONTORSPERRET_URL, getMerkKontrorsperretRequest(valgtBrukersFnr, valgtTraad));
    };

    if (resultat && !opprettOppgave) {
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

    return (
        <Style>
            <Checkbox
                label={'Opprett oppgave'}
                checked={opprettOppgave}
                onChange={_ => settOpprettOppgave(!opprettOppgave)}
            />
            <UnmountClosed isOpened={opprettOppgave}>
                <OpprettOppgaveContainer lukkPanel={() => props.lukkPanel} kontorsperreFunksjon={kontorsperr} />
            </UnmountClosed>
            {opprettOppgave ? null : (
                <Hovedknapp htmlType="button" onClick={kontorsperr} spinner={submitting} autoDisableVedSpinner>
                    Merk som kontorsperret
                </Hovedknapp>
            )}
            <Flatknapp htmlType="button" onClick={props.tilbake}>
                Tilbake
            </Flatknapp>
        </Style>
    );
}
