import * as React from 'react';
import { useSelector } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../redux/reducers';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import MainLayout from './MainLayout';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import { isLoaded } from '../../redux/restReducers/deprecatedRestResource';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Personside() {
    const personResource = useSelector((state: AppState) => state.restResources.personinformasjon);

    function getSideinnhold() {
        if (isLoaded(personResource) && erPersonResponsAvTypeBegrensetTilgang(personResource.data)) {
            return <BegrensetTilgangSide person={personResource.data} />;
        } else {
            return <MainLayout />;
        }
    }

    return (
        <Innholdslaster avhengigheter={[personResource]} returnOnError={onError}>
            {getSideinnhold()}
        </Innholdslaster>
    );
}

export default Personside;
