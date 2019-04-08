import * as React from 'react';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import EtikettBase from 'nav-frontend-etiketter';
import LazySpinner from '../../../../../components/LazySpinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

function VergemålsEtikett(props: { vergemål: Vergemal }) {
    const harVergemål = props.vergemål.verger && props.vergemål.verger.length > 0;

    if (!harVergemål) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

function VergemålEtikettContainer() {
    return (
        <ErrorBoundary boundaryName="Vergemålsetikett">
            <RestResourceConsumer<Vergemal>
                getResource={restResources => restResources.vergemal}
                returnOnPending={<LazySpinner type="S" />}
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker har verge</AlertStripeAdvarsel>}
            >
                {data => <VergemålsEtikett vergemål={data} />}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default VergemålEtikettContainer;
