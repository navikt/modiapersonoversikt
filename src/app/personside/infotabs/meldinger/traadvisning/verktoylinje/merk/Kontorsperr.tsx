import * as React from 'react';
import { useState } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { UnmountClosed } from 'react-collapse';
import OpprettOppgaveContainer from '../oppgave/OpprettOppgaveContainer';
import { apiBaseUri } from '../../../../../../../api/config';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { MerkKontorsperrRequest } from '../../../../../../../models/meldinger/merk';
import styled from 'styled-components/macro';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useHentPersondata } from '../../../../../../../utils/customHooks';
import { hasError, isPending } from '@nutgaard/use-fetch';

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

const Margin = styled.div`
    margin: 1rem 0;
`;

function getMerkKontrorsperretRequest(fnr: String, enhet: string, traad: Traad): MerkKontorsperrRequest {
    const meldingsidListe = traad.meldinger.map((melding) => melding.id);
    return {
        fnr: fnr,
        enhet: enhet,
        meldingsidListe: meldingsidListe
    };
}

export function Kontorsperr(props: Props) {
    const [opprettOppgave, settOpprettOppgave] = useState(true);
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const hentPersondata = useHentPersondata();
    const brukersNavEnhet =
        isPending(hentPersondata) || hasError(hentPersondata) ? null : hentPersondata.data.person.navEnhet;
    const brukersEnhetID = brukersNavEnhet?.id ? brukersNavEnhet.id : '';
    const [error, setError] = useState(false);

    const kontorsperr = () => {
        if (!brukersEnhetID) {
            setError(!error);
            return;
        }
        props.merkPost(
            MERK_KONTORSPERRET_URL,
            getMerkKontrorsperretRequest(valgtBrukersFnr, brukersEnhetID, props.valgtTraad),
            'Kontorsperring'
        );
    };

    return (
        <Style>
            {error && (
                <Margin>
                    <AlertStripeAdvarsel>Kunne ikke finne brukers NAV enhet</AlertStripeAdvarsel>
                </Margin>
            )}
            <Checkbox
                label={'Opprett oppgave'}
                checked={opprettOppgave}
                onChange={(_) => settOpprettOppgave(!opprettOppgave)}
            />
            <UnmountClosed isOpened={opprettOppgave}>
                <OpprettOppgaveContainer
                    lukkPanel={props.tilbake}
                    valgtTraad={props.valgtTraad}
                    onSuccessCallback={kontorsperr}
                />
            </UnmountClosed>
            {opprettOppgave ? null : (
                <Margin>
                    <Hovedknapp htmlType="button" onClick={kontorsperr}>
                        Merk som kontorsperret
                    </Hovedknapp>
                </Margin>
            )}
        </Style>
    );
}
