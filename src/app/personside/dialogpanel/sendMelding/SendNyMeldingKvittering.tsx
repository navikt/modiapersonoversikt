import * as React from 'react';
import { Meldingstype, SendReferatRequest } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering } from '../fellesStyling';
import { meldingstypeTekst } from '../../infotabs/meldinger/utils/meldingstekster';
import { KvitteringNyMelding, SendNyMeldingStatus } from './SendNyMeldingTypes';

export function ReferatSendtKvittering(props: {
    kvitteringNyMelding: KvitteringNyMelding;
    request: SendReferatRequest;
    lukk: () => void;
}) {
    const tittel = `${meldingstypeTekst(props.request.meldingstype)} sendt til bruker`;
    return (
        <DialogpanelKvittering
            tittel={tittel}
            fritekst={props.request.fritekst}
            meldingstype={props.request.meldingstype}
            traad={props.kvitteringNyMelding.traad}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.REFERAT_SENDT}
        />
    );
}

export function SporsmalSendtKvittering(props: { kvitteringNyMelding: KvitteringNyMelding; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Spørsmål ble sendt"
            fritekst={props.kvitteringNyMelding.fritekst}
            meldingstype={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
            traad={props.kvitteringNyMelding.traad}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.SPORSMAL_SENDT}
        />
    );
}

export function InfomeldingSendtKvittering(props: { kvitteringNyMelding: KvitteringNyMelding; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Infomelding ble sendt"
            fritekst={props.kvitteringNyMelding.fritekst}
            meldingstype={Meldingstype.INFOMELDING_MODIA_UTGAAENDE}
            traad={props.kvitteringNyMelding.traad}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.INFORMELDING_SENDT}
        />
    );
}

export function MeldingSendtFeilet(props: { fritekst: string; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Melding ble sendt, men feil i baksystem"
            fritekst={props.fritekst}
            meldingstype={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
            lukk={props.lukk}
            meldingstatus={SendNyMeldingStatus.ERROR}
        />
    );
}
