import * as React from 'react';
import styled from 'styled-components';

import EndreNavnForm from './endrenavn/EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import Kontaktinformasjon from './kontaktinformasjon/KontaktinformasjonContainer';
import TilrettelagtKommunikasjonContainer from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjonContainer';
import ErrorBoundary from '../../components/ErrorBoundary';
import AdresseForm from './adresse/AdresseContainer';
import EndreKontonummerForm from './kontonummer/EndreKontonummerForm';

export const FormKnapperWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    > * {
        margin: 0.5rem 0 0.5rem 1em;
    }
`;

interface Props {
    person: Person;
    veilderRoller: VeilederRoller;
}

function BrukerprofilForm({ person, veilderRoller }: Props) {
    return (
        <ErrorBoundary>
            <EndreKontonummerForm person={person} veilederRoller={veilderRoller} />
            <AdresseForm person={person} veilederRoller={veilderRoller} />
            <Kontaktinformasjon person={person} />
            <TilrettelagtKommunikasjonContainer person={person} />
            <EndreNavnForm person={person} veilederRoller={veilderRoller} />
        </ErrorBoundary>
    );
}

export default BrukerprofilForm;
