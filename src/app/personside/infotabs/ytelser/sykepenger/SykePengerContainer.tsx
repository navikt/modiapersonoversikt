import * as React from 'react';
import { SykepengerResponse } from '../../../../../models/ytelse/sykepenger';
import { loggEvent } from '../../../../../utils/frontendLogger';
import SykepengerEkspanderbartpanel from './SykepengerEkspanderbartPanel';
import BrukTypedAutoFetchingRestResource from '../pleiepenger/BrukTypedAutoFetchingRestResource';
import { useEffect } from 'react';

function SykePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
    }, []);
    return (
        <BrukTypedAutoFetchingRestResource<SykepengerResponse>
            spinnerSize="M"
            getRestResource={restResources => restResources.sykepenger}
        >
            {data => {
                if (!data.sykepenger) {
                    return null;
                }
                return data.sykepenger.map((sykepengerettighet, index) => (
                    <SykepengerEkspanderbartpanel key={index} sykepenger={sykepengerettighet} />
                ));
            }}
        </BrukTypedAutoFetchingRestResource>
    );
}

export default SykePengerContainer;
