import * as React from 'react';
import styled from 'styled-components';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { NavKontorResponse } from '../../../../../models/navkontor';
import { Bold } from '../../../../../components/common-styled-components';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

const NavKontorSection = styled.section`
    margin: 0.5rem 0 0 0;
    display: flex;
    justify-content: flex-end;
    > * {
        white-space: nowrap;
    }
    > *:first-child:after {
        content: '/';
        margin: 0 0.2em;
    }
    > *:last-child {
        display: flex;
        align-items: center;
        margin: 0;
    }
`;

const onError = <em>Problemer med å hente nav-enhet</em>;
const onNotFound = (
    <Normaltekst>
        {' '}
        <Bold>Ingen enhet</Bold>{' '}
    </Normaltekst>
);

function NavKontorVisning(props: { navKontor: NavKontorResponse }) {
    return (
        <Element>
            {props.navKontor.enhetId} {props.navKontor.enhetNavn}
        </Element>
    );
}

function NavKontorContainer() {
    return (
        <NavKontorSection aria-label="Nav kontor">
            <Element tag="h2">NAV-kontor</Element>
            <RestResourceConsumer<NavKontorResponse>
                getResource={restResources => restResources.brukersNavKontor}
                spinnerSize={'S'}
                returnOnError={onError}
                returnOnNotFound={onNotFound}
            >
                {navkontor => <NavKontorVisning navKontor={navkontor} />}
            </RestResourceConsumer>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
