import * as React from 'react';
import { Meldingstype, SendReferatRequest } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering } from '../fellesStyling';

export function ReferatSendtKvittering(props: { request: SendReferatRequest }) {
    return (
        <DialogpanelKvittering
            tittel="Referatet ble loggført"
            fritekst={props.request.fritekst}
            meldingstype={props.request.meldingstype}
            lukk={() => null}
        />
    );
}

export function SporsmalSendtKvittering(props: { fritekst: string }) {
    return (
        <DialogpanelKvittering
            tittel="Spørsmål ble sendt"
            fritekst={props.fritekst}
            meldingstype={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
            lukk={() => null}
        />
    );
}
