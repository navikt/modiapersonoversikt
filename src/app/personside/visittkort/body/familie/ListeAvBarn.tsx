import * as React from 'react';

import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Familierelasjon, getBarnUnder21, Kjønn } from '../../../../../models/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';

const jentePath = require('./jentebarn.svg');
const guttePath = require('./guttebarn.svg');

interface Props {
    relasjoner: Familierelasjon[];
}

interface BarnProps {
    barn: Familierelasjon;
}

function Barn({barn}: BarnProps) {
    const beskrivelse = barn.tilPerson.kjonn === Kjønn.Kvinne ? 'Jente' : 'Gutt';
    const ikonPath = barn.tilPerson.kjonn === Kjønn.Kvinne ? jentePath : guttePath;
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikonPath={ikonPath}>
            <Undertekst><NavnOgAlder relasjon={barn}/></Undertekst>
            <Undertekst>{barn.tilPerson.fødselsnummer}</Undertekst>
            <Undertekst><BorMedBruker harSammeBosted={barn.harSammeBosted}/></Undertekst>
        </VisittkortElement>
    );
}

function ListeAvBarn({relasjoner}: Props) {
    const barn = getBarnUnder21(relasjoner).map(barnet => <Barn key={barnet.tilPerson.fødselsnummer} barn={barnet}/>);
    return <>{barn}</>;
}

export default ListeAvBarn;