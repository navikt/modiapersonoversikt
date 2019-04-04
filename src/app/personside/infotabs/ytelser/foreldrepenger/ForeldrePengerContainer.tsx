import * as React from 'react';
import { useEffect } from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import ForeldrepengerEkspanderbartpanel from './ForeldrepengerEkspanderbartPanel';
import RestResourceConsumerTyped from '../../../../../restResources/consumer/RestResourceConsumerTyped';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';

function ForeldrePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Foreldrepenger');
    }, []);

    return (
        <RestResourceConsumerTyped<ForeldrepengerResponse>
            spinnerSize="M"
            getRestResource={restResources => restResources.foreldrepenger}
        >
            {data => {
                if (!data.foreldrepenger || !data.foreldrepenger[0]) {
                    return null;
                }
                return data.foreldrepenger.map((foreldrepengerettighet, index) => (
                    <ForeldrepengerEkspanderbartpanel key={index} foreldrepenger={foreldrepengerettighet} />
                ));
            }}
        </RestResourceConsumerTyped>
    );
}

export default ForeldrePengerContainer;
