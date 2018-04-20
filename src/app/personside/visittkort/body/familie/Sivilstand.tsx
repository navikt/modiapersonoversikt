import * as React from 'react';
import * as moment from 'moment';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';

import VisittkortElement from '../VisittkortElement';
import { Familierelasjon, getPartner, Person } from '../../../../../models/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';

const heartPath = require('../../../../../resources/svg/heart.svg');

interface Props {
    person: Person;
}

interface PartnerProps {
    relasjon: Familierelasjon;
    fraOgMed: string;
}

function Partner({relasjon, fraOgMed}: PartnerProps) {

    const relasjonFraOgMed = moment(fraOgMed).format('DD.MM.YYYY');
    return (
        <>
            <UndertekstBold>Gift ({relasjonFraOgMed})</UndertekstBold>
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
        <Partner relasjon={partner} fraOgMed={person.sivilstand.fraOgMed}/>
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