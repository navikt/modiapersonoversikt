import * as React from 'react';
import { PleiepengerResponse } from '../../../../../models/ytelse/pleiepenger';
import { loggEvent } from '../../../../../utils/frontendLogger';
import PleiepengerEkspanderbartpanel from './PleiepengerEkspanderbartPanel';
import RestResourceConsumerTyped from '../../../../../restResources/consumer/RestResourceConsumerTyped';
import { useEffect } from 'react';

function PleiePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Pleiepenger');
    }, []);

    return (
        <RestResourceConsumerTyped<PleiepengerResponse>
            spinnerSize="M"
            getRestResource={restResources => restResources.pleiepenger}
        >
            {data => {
                if (!data.pleiepenger || !data.pleiepenger[0]) {
                    return null;
                }
                return data.pleiepenger.map((pleiepengeRettighet, index) => (
                    <PleiepengerEkspanderbartpanel key={index} pleiepenger={pleiepengeRettighet} />
                ));
            }}
        </RestResourceConsumerTyped>
    );
}

export default PleiePengerContainer;
