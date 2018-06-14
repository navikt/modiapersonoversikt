import * as React from 'react';
import styled from 'styled-components';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import EndreNavnForm from './endrenavn/EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import Kontaktinformasjon from './kontaktinformasjon/KontaktinformasjonContainer';
import TilrettelagtKommunikasjonContainer from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjonContainer';
import ErrorBoundary from '../../components/ErrorBoundary';
import AdresseForm from './adresse/AdresseContainer';

export const FormKnapperWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  > * {
    margin-left: 1em;
  }
`;

interface Props {
    person: Person;
    veilderRoller?: VeilederRoller;
}

function BrukerprofilForm({ person, veilderRoller }: Props) {
    return (
        <ErrorBoundary>
            <EndreNavnForm person={person} veilederRoller={veilderRoller}/>
            <AdresseForm person={person}/>
            <form>
                <Undertittel>Kontonummer</Undertittel>
            </form>
            <Kontaktinformasjon person={person} />
            <TilrettelagtKommunikasjonContainer person={person} />
        </ErrorBoundary>
    );
}

export default BrukerprofilForm;
