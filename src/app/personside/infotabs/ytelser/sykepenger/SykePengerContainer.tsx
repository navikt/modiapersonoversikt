import * as React from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import SykepengerEkspanderbartpanel from './SykepengerEkspanderbartPanel';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumerTyped from '../../../../../restResources/consumer/RestResourceConsumerTyped';
import { SykepengerResponse } from '../../../../../models/ytelse/sykepenger';
import { useEffect } from 'react';

function SykePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
    }, []);

    return (
        <ErrorBoundary boundaryName="SykepengerContainer">
            <RestResourceConsumerTyped<SykepengerResponse>
                spinnerSize="M"
                getRestResource={restResources => restResources.sykepenger}
            >
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    return data.sykepenger.map(rettighet => (
                        <SykepengerEkspanderbartpanel key={rettighet.sykmeldtFom} sykepenger={rettighet} />
                    ));
                }}
            </RestResourceConsumerTyped>
        </ErrorBoundary>
    );
}

export default SykePengerContainer;
