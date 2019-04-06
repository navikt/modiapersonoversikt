import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import VergemalWrapper from './Vergemal';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

const feilmelding = () => <AlertStripe type="advarsel">Feil ved lasting av vergemål</AlertStripe>;

function VergemalContainer() {
    return (
        <RestResourceConsumer<Vergemal>
            returnOnError={feilmelding()}
            getRestResource={restResources => restResources.vergemal}
            spinnerSize={'L'}
        >
            {data => <VergemalWrapper vergemal={data} />}
        </RestResourceConsumer>
    );
}

export default VergemalContainer;
