import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import styled from 'styled-components';

import EndreNavnForm from './endrenavn/EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import Kontaktinformasjon from './kontaktinformasjon/KontaktinformasjonContainer';
import TilrettelagtKommunikasjonContainer from
        './tilrettelagtkommunikasjon/TilrettelagtKommunikasjonContainer';

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
        <>
            <EndreNavnForm person={person} veilederRoller={veilderRoller}/>
            <form>
                <Undertittel>Adresse</Undertittel>
            </form>
            <form>
                <Undertittel>Kontonummer</Undertittel>
            </form>
            <Kontaktinformasjon person={person} />
            <TilrettelagtKommunikasjonContainer person={person} />
        </>
    );
}

export default BrukerprofilForm;
