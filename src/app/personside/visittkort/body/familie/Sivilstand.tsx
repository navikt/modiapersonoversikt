import * as React from 'react';
import * as moment from 'moment';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';
import VisittkortElement from '../VisittkortElement';

import { Familierelasjon, getPartner, Person, Sivilstand } from '../../../../../models/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';

const heartPath = require('./heart.svg');

interface Props {
    person: Person;
}

interface PartnerProps {
    relasjon: Familierelasjon;
    sivilstand: Sivilstand;
}

function Partner({relasjon, sivilstand}: PartnerProps) {

    const relasjonFraOgMed = moment(sivilstand.fraOgMed).format('DD.MM.YYYY');
    return (
        <>
            <UndertekstBold>{sivilstand.beskrivelse} ({relasjonFraOgMed})</UndertekstBold>
            <Undertekst><NavnOgAlder relasjon={relasjon}/></Undertekst>
            <Undertekst>{relasjon.tilPerson.fødselsnummer}</Undertekst>
            <Undertekst><BorMedBruker harSammeBosted={relasjon.harSammeBosted}/></Undertekst>
        </>
    );
}

function SivilstandVisning({person}: Props) {
    const partner = getPartner(person);
    if (!partner) {
        return <UndertekstBold>{person.sivilstand.beskrivelse}</UndertekstBold>;
    }

    return (
        <Partner relasjon={partner} sivilstand={person.sivilstand}/>
    );
}

function SivilstandWrapper({person}: Props) {
    return (
        <VisittkortElement beskrivelse="Sivilstand" ikonPath={heartPath}>
            <SivilstandVisning person={person}/>
        </VisittkortElement>
    );
}

export default SivilstandWrapper;