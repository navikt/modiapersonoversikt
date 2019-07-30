import * as React from 'react';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { Person } from '../../../../../models/person/person';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

interface Props {
    person: Person;
}

function NavKontorContainer(props: Props) {
    return (
        <RestResourceConsumer<BrukersNavKontorResponse>
            getResource={restResources => restResources.brukersNavKontor}
            spinnerSize={'L'}
        >
            {navkontor => <NavKontorVisning brukersNavKontorResponse={navkontor} />}
        </RestResourceConsumer>
    );
}

export default NavKontorContainer;
