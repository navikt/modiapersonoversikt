import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';
import { BigCenteredLazySpinner } from '../BigCenteredLazySpinner';
import RestResourceConsumer from '../../rest/consumer/RestResourceConsumer';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Sideinnhold(props: { data: PersonRespons }) {
    if (erPersonResponsAvTypeBegrensetTilgang(props.data)) {
        return <BegrensetTilgangSide person={props.data as BegrensetTilgang} />;
    } else {
        return <Visittkort />;
    }
}

function Personside() {
    return (
        <RestResourceConsumer<PersonRespons>
            getResource={restResources => restResources.personinformasjon}
            returnOnPending={BigCenteredLazySpinner}
            returnOnError={onError}
        >
            {person => <Sideinnhold data={person} />}
        </RestResourceConsumer>
    );
}

export default Personside;
