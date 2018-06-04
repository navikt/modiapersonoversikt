import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';

import { Familierelasjon, getMorOgFar, Kjønn, Relasjonstype } from '../../../../../models/person/person';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import { utledKjønnFraFødselsnummer } from '../../../../../utils/fnr-utils';
import MannIkon from '../../../../../svg/Mann';
import KvinneIkon from '../../../../../svg/Kvinne';

interface Props {
    familierelasjoner: Familierelasjon[];
}

interface ForelderProps {
    relasjon: Familierelasjon;
}

export function Forelder({relasjon}: ForelderProps) {
    const beskrivelse = relasjon.rolle === Relasjonstype.Mor ? 'Mor' : 'Far';
    const kjønn = utledKjønnFraFødselsnummer(relasjon.tilPerson.fødselsnummer);
    const ikon = kjønn === Kjønn.Mann ? <MannIkon /> : <KvinneIkon />;
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={ikon}>
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