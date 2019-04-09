import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';
import { KRRKontaktinformasjon } from '../../../../../models/kontaktinformasjon';

function getEtikett(data: KRRKontaktinformasjon) {
    if (data.reservasjon === 'true') {
        return <EtikettBase type="fokus">Reservert i KRR</EtikettBase>;
    }
    if (!data.epost && !data.mobiltelefon) {
        return <EtikettBase type="fokus">Ikke registrert i KRR</EtikettBase>;
    }
    return null;
}

function ReservertIKRREtikett() {
    return (
        <ErrorBoundary boundaryName="EgenansattEtikett">
            <RestResourceConsumer<KRRKontaktinformasjon>
                getResource={restResources => restResources.kontaktinformasjon}
                spinnerSize="S"
                returnOnError={
                    <AlertStripeAdvarsel>Kunne ikke sjekke om bruker er reservert i KRR</AlertStripeAdvarsel>
                }
            >
                {data => getEtikett(data)}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default ReservertIKRREtikett;
