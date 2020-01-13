import * as React from 'react';
import { useAppState } from '../../utils/customHooks';
import VelgEnhet from '../container/VelgEnhet';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../container/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import MainLayout from './MainLayout';

function Personoversikt() {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const personResource = useRestResource(resources => resources.personinformasjon);

    if (!valgtEnhet) {
        return <VelgEnhet />;
    }

    const content =
        personResource.data && erPersonResponsAvTypeBegrensetTilgang(personResource.data) ? (
            <BegrensetTilgangSide person={personResource.data} />
        ) : (
            <MainLayout />
        );

    return (
        <>
            <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
            {content}
        </>
    );
}

export default Personoversikt;
