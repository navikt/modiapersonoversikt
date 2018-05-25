import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import EndreNavnForm from './EndreNavnForm';
import { Person } from '../../models/person/person';

interface Props {
    person: Person;
}

function BrukerprofilForm({person}: Props) {
    return (
        <>
            <EndreNavnForm person={person}/>
            <form>
                <Undertittel>Adresse</Undertittel>
            </form>
            <form>
                <Undertittel>Kontonummer</Undertittel>
            </form>
            <form>
                <Undertittel>Kontaktinformasjon</Undertittel>
            </form>
            <form>
                <Undertittel>Tilrettelagt kommunikasjon</Undertittel>
            </form>
        </>
    );
}

export default BrukerprofilForm;
