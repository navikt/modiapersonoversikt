import * as React from 'react';
import { Meldingstype, SendReferatRequest } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering } from '../fellesStyling';
import { meldingstypeTekst } from '../../infotabs/meldinger/utils/meldingstekster';

export function ReferatSendtKvittering(props: { request: SendReferatRequest; lukk: () => void }) {
    const tittel = `${meldingstypeTekst(props.request.meldingstype)} sent til bruker`;
    return (
        <DialogpanelKvittering
            tittel={tittel}
            fritekst={props.request.fritekst}
            meldingstype={props.request.meldingstype}
            lukk={props.lukk}
        />
    );
}

export function SporsmalSendtKvittering(props: { fritekst: string; lukk: () => void }) {
    return (
        <DialogpanelKvittering
            tittel="Spørsmål ble sendt"
            fritekst={props.fritekst}
            meldingstype={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
            lukk={props.lukk}
        />
    );
}
