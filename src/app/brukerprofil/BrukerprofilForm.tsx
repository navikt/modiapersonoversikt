import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import EndreNavnForm from './EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import KontaktinformasjonFormContainer from './kontaktinformasjon/KontaktinformasjonContainer';
import TilrettelagtKommunikasjonForm from './TilrettelagtKommunikasjonForm';

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
            <KontaktinformasjonFormContainer person={person} fødselsnummer={person.fødselsnummer}/>
            <TilrettelagtKommunikasjonForm person={person} />
        </>
    );
}

export default BrukerprofilForm;
