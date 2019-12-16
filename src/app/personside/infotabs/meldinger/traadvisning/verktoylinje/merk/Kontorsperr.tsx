import * as React from 'react';
import { useState } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import OpprettOppgaveContainer from '../oppgave/OpprettOppgaveContainer';
import { apiBaseUri } from '../../../../../../../api/config';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { MerkKontorsperrRequest } from '../../../../../../../models/meldinger/merk';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    valgtTraad: Traad;
    tilbake: () => void;
    lukkPanel: () => void;
    merkPost: (url: string, object: any, name: string) => void;
}

const MERK_KONTORSPERRET_URL = `${apiBaseUri}/dialogmerking/kontorsperret`;

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
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const valgtTraad = props.valgtTraad;

    const kontorsperr = () => {
        props.merkPost(
            MERK_KONTORSPERRET_URL,
            getMerkKontrorsperretRequest(valgtBrukersFnr, valgtTraad),
            'Kontorsperring'
        );
    };

    return (
        <Style>
            <Checkbox
                label={'Opprett oppgave'}
                checked={opprettOppgave}
                onChange={_ => settOpprettOppgave(!opprettOppgave)}
            />
            <UnmountClosed isOpened={opprettOppgave}>
                <OpprettOppgaveContainer
                    lukkPanel={props.tilbake}
                    valgtTraad={valgtTraad}
                    onSuccessCallback={kontorsperr}
                />
            </UnmountClosed>
            {opprettOppgave ? null : (
                <Hovedknapp htmlType="button" onClick={kontorsperr}>
                    Merk som kontorsperret
                </Hovedknapp>
            )}
        </Style>
    );
}
