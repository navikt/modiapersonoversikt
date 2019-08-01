import * as React from 'react';
import { NavKontorResponse } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';
import VisittkortElement from '../VisittkortElement';
import NavLogo from '../../../../../svg/NavLogo';

const onNotFound = (
    <VisittkortElement beskrivelse="Ingen enhet" ikon={<NavLogo />}>
        <br />
    </VisittkortElement>
);

function NavKontorContainer() {
    return (
        <RestResourceConsumer<NavKontorResponse>
            getResource={restResources => restResources.brukersNavKontor}
            spinnerSize={'L'}
            returnOnNotFound={onNotFound}
        >
            {navkontor => <NavKontorVisning brukersNavKontorResponse={navkontor} />}
        </RestResourceConsumer>
    );
}

export default NavKontorContainer;
