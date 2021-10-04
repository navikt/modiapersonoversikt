import * as React from 'react';
import styled from 'styled-components/macro';
import { Element } from 'nav-frontend-typografi';
import { Bold } from '../../../../../components/common-styled-components';
import { Person } from '../../PersondataDomain';

interface Props {
    person: Person;
}

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

function NavKontorContainer({ person }: Props) {
    if (!person.navEnhet) {
        return (
            <NavKontorSection aria-label="Nav kontor">
                <Element tag="h2">NAV-kontor</Element> <Bold>Ingen enhet</Bold>{' '}
            </NavKontorSection>
        );
    }

    return (
        <NavKontorSection aria-label="Nav kontor">
            <Element tag="h2">NAV-kontor</Element>
            <Element>
                {person.navEnhet.id} {person.navEnhet.navn}
            </Element>
        </NavKontorSection>
    );
}

export default NavKontorContainer;
