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
    const navKontorInfo = person.navEnhet
        ? `NAV-kontor / ${person.navEnhet.id} ${person.navEnhet.navn}`
        : 'NAV-kontor / Ingen enhet';
    return (
        <NavKontorSection aria-label="Nav kontor">
            <Element tag="h2">{navKontorInfo}</Element>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
