import * as React from 'react';
import { DialogpanelKvittering } from '../fellesStyling';
import { KvitteringNyMelding, SendNyMeldingStatus } from './SendNyMeldingTypes';

export function ReferatSendtKvittering(props: { kvitteringNyMelding: KvitteringNyMelding; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel={'Referat sendt til bruker'}
            fritekst={props.kvitteringNyMelding.fritekst}
            traad={props.kvitteringNyMelding.traad}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.REFERAT_SENDT}
        />
    );
}

export function SamtaleSendtKvittering(props: { kvitteringNyMelding: KvitteringNyMelding; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Samtale ble sendt"
            fritekst={props.kvitteringNyMelding.fritekst}
            traad={props.kvitteringNyMelding.traad}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.SPORSMAL_SENDT}
        />
    );
}

export function MeldingSendtFeilet(props: { fritekst: string; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Meldingen ble ikke sendt"
            fritekst={props.fritekst}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.ERROR}
        />
    );
}
