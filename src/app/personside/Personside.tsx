import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import MainLayout from './MainLayout';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import RestResourceConsumer from '../../rest/consumer/RestResourceConsumer';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Personside() {
    function getSideinnhold(personResource: PersonRespons) {
        if (erPersonResponsAvTypeBegrensetTilgang(personResource)) {
            return <BegrensetTilgangSide person={personResource} />;
        } else {
            return <MainLayout />;
        }
    }

    return (
        <RestResourceConsumer<PersonRespons>
            getResource={restResources => restResources.personinformasjon}
            returnOnError={onError}
        >
            {data => getSideinnhold(data)}
        </RestResourceConsumer>
    );
}

export default Personside;
