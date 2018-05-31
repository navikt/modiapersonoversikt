import * as React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import EndreNavnForm from './EndreNavnForm';
import { Person } from '../../models/person/person';
import { VeilederRoller } from '../../models/veilederRoller';
import Kontaktinformasjon from './kontaktinformasjon/KontaktinformasjonContainer';
import Innholdslaster from '../../components/Innholdslaster';
import { Reducer } from '../../redux/reducer';
import { KodeverkResponse } from '../../models/kodeverk';
import TilrettelagtKommunikasjonContainer from
        './kontaktinformasjon/TilrettelagtKommunikasjonContainer';

interface Props {
    person: Person;
    veilderRoller?: VeilederRoller;
    tilrettelagtKommunikasjonReducer: Reducer<KodeverkResponse>;
}

function BrukerprofilForm({ person, veilderRoller, tilrettelagtKommunikasjonReducer }: Props) {
    return (
        <>
            <EndreNavnForm person={person} veilederRoller={veilderRoller}/>
            <form>
                <Undertittel>Adresse</Undertittel>
            </form>
            <form>
                <Undertittel>Kontonummer</Undertittel>
            </form>
            <Kontaktinformasjon person={person} fødselsnummer={person.fødselsnummer}/>
            <Innholdslaster avhengigheter={[tilrettelagtKommunikasjonReducer]}>
                <TilrettelagtKommunikasjonContainer person={person} veilederRoller={veilderRoller}/>
            </Innholdslaster>
        </>
    );
}

export default BrukerprofilForm;
