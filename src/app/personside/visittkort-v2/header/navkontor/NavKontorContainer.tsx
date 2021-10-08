import * as React from 'react';
import styled from 'styled-components/macro';
import { Element } from 'nav-frontend-typografi';
import { Person } from '../../PersondataDomain';

interface Props {
    person: Person;
}

const NavKontorSection = styled.section`
    margin: 0.5rem 0 0 0;
    display: flex;
    justify-content: flex-end;
`;

function NavKontorContainer({ person }: Props) {
    if (!person.navEnhet) {
        return (
            <NavKontorSection aria-label="Nav kontor">
                <Element tag="h2">NAV-kontor / Ingen enhet</Element>
            </NavKontorSection>
        );
    }

    return (
        <NavKontorSection aria-label="Nav kontor">
            <Element tag="h2">
                NAV-kontor / {person.navEnhet.id} {person.navEnhet.navn}
            </Element>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
