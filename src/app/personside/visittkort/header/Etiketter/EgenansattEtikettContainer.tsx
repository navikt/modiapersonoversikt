import * as React from 'react';
import { Egenansatt } from '../../../../../models/egenansatt';
import EtikettBase from 'nav-frontend-etiketter';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

function EgenansattEtikett(props: { erEgenansatt: boolean }) {
    if (!props.erEgenansatt) {
        return null;
    }
    return <EtikettBase type={'advarsel'}>Egen ansatt</EtikettBase>;
}

function EgenAnsattEtikettContainer() {
    return (
        <ErrorBoundary boundaryName="EgenansattEtikett">
            <RestResourceConsumer<Egenansatt>
                getRestResource={restResources => restResources.egenAnsatt}
                spinnerSize="S"
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker er egenansatt</AlertStripeAdvarsel>}
            >
                {data => <EgenansattEtikett erEgenansatt={data.erEgenAnsatt} />}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default EgenAnsattEtikettContainer;
