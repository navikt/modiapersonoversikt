import * as React from 'react';
import {
    KommunikasjonsKanal,
    Meldingstype,
    SendReferatRequest,
    SendSpørsmålRequest
} from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering } from '../fellesStyling';
import { FinishedPostResource } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';

export function ReferatSendtKvittering(props: { resource: FinishedPostResource<SendReferatRequest, {}> }) {
    const dispatch = useDispatch();
    const meldingstype =
        props.resource.payload.kanal === KommunikasjonsKanal.Telefon
            ? Meldingstype.SAMTALEREFERAT_TELEFON
            : Meldingstype.SAMTALEREFERAT_OPPMOTE;
    return (
        <DialogpanelKvittering
            tittel="Referatet ble loggført"
            fritekst={props.resource.payload.fritekst}
            meldingstype={meldingstype}
            lukk={() => dispatch(props.resource.actions.reset)}
        />
    );
}

export function SporsmalSendtKvittering(props: { resource: FinishedPostResource<SendSpørsmålRequest, {}> }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvittering
            tittel="Spørsmål ble sendt"
            fritekst={props.resource.payload.fritekst}
            meldingstype={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
            lukk={() => dispatch(props.resource.actions.reset)}
        />
    );
}
