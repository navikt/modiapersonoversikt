import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
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

function NavKontorVisning(props: { navKontor: BrukersNavKontorResponse }) {
    if (!props.navKontor) {
        return (
            <Normaltekst>
                <Bold>Ingen enhet</Bold>
            </Normaltekst>
        );
    }

    return (
        <Normaltekst>
            <Bold>
                {props.navKontor.enhetId} {props.navKontor.enhetNavn}
            </Bold>
        </Normaltekst>
    );
}

function NavKontorContainer() {
    return (
        <NavKontorSection aria-label="Nav kontor">
            <Normaltekst tag="h2">
                <Bold>NAV-kontor</Bold>
            </Normaltekst>
            <RestResourceConsumer<BrukersNavKontorResponse>
                getResource={restResources => restResources.brukersNavKontor}
                spinnerSize={'S'}
                returnOnError={onError}
            >
                {navkontor => <NavKontorVisning navKontor={navkontor} />}
            </RestResourceConsumer>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
