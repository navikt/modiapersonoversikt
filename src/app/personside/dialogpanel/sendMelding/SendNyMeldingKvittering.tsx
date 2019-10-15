import * as React from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering } from '../fellesStyling';

import { KvitteringsData } from '../fortsettDialog/FortsettDialogContainer';

export function ReferatSendtKvittering(props: { kvitteringsData: KvitteringsData }) {
    return (
        <DialogpanelKvittering
            tittel="Referatet ble loggført"
            fritekst={props.kvitteringsData.fritekst}
            meldingstype={props.kvitteringsData.meldingstype}
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
