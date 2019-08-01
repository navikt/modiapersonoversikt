import * as React from 'react';
import RequestTilbakemelding from '../../RequestTilbakemelding';
import { PostStatus } from '../../../../rest/utils/postResource';

export default function SubmitFeedback(props: { visFeedback: boolean; status: PostStatus }) {
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
