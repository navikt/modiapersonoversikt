import * as React from 'react';

import { STATUS } from '../../../../redux/restReducers/utils';
import RequestTilbakemelding from '../../RequestTilbakemelding';

export default function SubmitFeedback(props: { visFeedback: boolean; status: STATUS }) {
    if (!props.visFeedback) {
        return null;
    }

    return (
        <RequestTilbakemelding
            status={props.status}
            onSuccess={'Adressen ble endret'}
            onError={'Det skjedde en feil ved endring av adresse'}
        />
    );
}
