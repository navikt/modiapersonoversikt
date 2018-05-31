import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import EndreNavnForm from './EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import KontaktinformasjonSection from './kontaktinformasjon/KontaktinformasjonContainer';
import styled from 'styled-components';

export const FormKnapperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
    person: Person;
    veilderRoller?: VeilederRoller;
}

function BrukerprofilForm({person, veilderRoller}: Props) {
    return (
        <>
            <EndreNavnForm person={person} veilederRoller={veilderRoller}/>
            <form>
                <Undertittel>Adresse</Undertittel>
            </form>
            <form>
                <Undertittel>Kontonummer</Undertittel>
            </form>
            <KontaktinformasjonSection person={person} fødselsnummer={person.fødselsnummer}/>
            <form>
                <Undertittel>Tilrettelagt kommunikasjon</Undertittel>
            </form>
        </>
    );
}

export default BrukerprofilForm;
