import * as React from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import SykepengerEkspanderbartpanel from './SykepengerEkspanderbartPanel';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';
import { SykepengerResponse } from '../../../../../models/ytelse/sykepenger';
import { useEffect } from 'react';

function SykePengerContainer() {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
    }, []);

    return (
        <ErrorBoundary boundaryName="SykepengerContainer">
            <RestResourceConsumer<SykepengerResponse>
                spinnerSize="M"
                getResource={restResources => restResources.sykepenger}
            >
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    return data.sykepenger.map(rettighet => (
                        <SykepengerEkspanderbartpanel key={rettighet.sykmeldtFom} sykepenger={rettighet} />
                    ));
                }}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default SykePengerContainer;
