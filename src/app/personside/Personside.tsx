import * as React from 'react';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import MainLayout from './MainLayout';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import { hasData } from '../../rest/utils/restResource';
import { useRestResource } from '../../rest/consumer/useRestResource';

function Personside() {
    const personResource = useRestResource(resources => resources.personinformasjon);
    if (hasData(personResource) && erPersonResponsAvTypeBegrensetTilgang(personResource.data)) {
        return <BegrensetTilgangSide person={personResource.data} />;
    } else {
        return <MainLayout />;
    }
}

export default Personside;
