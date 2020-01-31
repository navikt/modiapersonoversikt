import * as React from 'react';
import { Egenansatt } from '../../../../../models/egenansatt';
import EtikettBase from 'nav-frontend-etiketter';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';
import LazySpinner from '../../../../../components/LazySpinner';

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
                getResource={restResources => restResources.egenAnsatt}
                returnOnPending={<LazySpinner type="S" delay={1000} />}
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker er egenansatt</AlertStripeAdvarsel>}
            >
                {data => <EgenansattEtikett erEgenansatt={data.erEgenAnsatt} />}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default EgenAnsattEtikettContainer;
