import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { PersonRespons } from '../../models/person/person';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';
import { BigCenteredLazySpinner } from '../BigCenteredLazySpinner';
import RestResourceConsumer from '../../rest/consumer/RestResourceConsumer';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Personside() {
    return (
        <RestResourceConsumer<PersonRespons>
            getResource={restResources => restResources.personinformasjon}
            returnOnPending={BigCenteredLazySpinner}
            returnOnError={onError}
        >
            {() => <Visittkort />}
        </RestResourceConsumer>
    );
}

export default Personside;
