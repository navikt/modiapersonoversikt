import * as React from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { Person } from '../../PersondataDomain';
import { mapUgyldigGT } from '../../visittkort-utils';

interface Props {
    person: Person;
}

const NavKontorSection = styled.section`
    margin: 0.5rem 0 0 0;
    display: flex;
    justify-content: flex-end;
`;

function NavKontorContainer({ person }: Props) {
    let navKontorInfo: string;
    if (person.geografiskTilknytning === null) {
        navKontorInfo = 'Nav-kontor / Ingen enhet';
    } else if (person.navEnhet === null) {
        navKontorInfo = `Nav-kontor / ${mapUgyldigGT(person.geografiskTilknytning)}`;
    } else {
        navKontorInfo = `Nav-kontor / ${person.navEnhet.id} ${person.navEnhet.navn}`;
    }

    return (
        <NavKontorSection aria-label="Nav kontor">
            <Element tag="h2">{navKontorInfo}</Element>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
