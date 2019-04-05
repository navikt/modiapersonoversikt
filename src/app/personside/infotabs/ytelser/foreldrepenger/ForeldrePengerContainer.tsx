import * as React from 'react';
import { useEffect } from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import ForeldrepengerEkspanderbartpanel from './ForeldrepengerEkspanderbartPanel';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';

function ForeldrePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Foreldrepenger');
    }, []);

    return (
        <RestResourceConsumer<ForeldrepengerResponse>
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
        </RestResourceConsumer>
    );
}

export default ForeldrePengerContainer;
