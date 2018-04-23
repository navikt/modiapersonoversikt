import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';

import { Familierelasjon, getMorOgFar, Kjønn, Relasjonstype } from '../../../../../models/person';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import { utledKjønnFraFødselsnummer } from '../../../../../utils/fnr-utils';

const mannPath = require('../../../../../resources/svg/mann.svg');
const kvinnePath = require('../../../../../resources/svg/kvinne.svg');

interface Props {
    familierelasjoner: Familierelasjon[];
}

interface ForelderProps {
    relasjon: Familierelasjon;
}

export function Forelder({relasjon}: ForelderProps) {
    const beskrivelse = relasjon.rolle === Relasjonstype.Mor ? 'Mor' : 'Far';
    const kjønn = utledKjønnFraFødselsnummer(relasjon.tilPerson.fødselsnummer);
    const ikon = {
        path: kjønn === Kjønn.Mann ? mannPath : kvinnePath,
    };
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikonPath={ikon.path}>
            <Undertekst><NavnOgAlder relasjon={relasjon}/></Undertekst>
            <Undertekst>{relasjon.tilPerson.fødselsnummer}</Undertekst>
            <Undertekst><BorMedBruker harSammeBosted={relasjon.harSammeBosted}/></Undertekst>
        </VisittkortElement>
    );
}

function Foreldre({familierelasjoner}: Props) {
    const foreldre = getMorOgFar(familierelasjoner);

    const listeAvForeldre = foreldre.map(relasjon =>
        <Forelder relasjon={relasjon} key={relasjon.tilPerson.fødselsnummer}/>);
    return <>{listeAvForeldre}</>;
}

export default Foreldre;