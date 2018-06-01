import * as React from 'react';
import * as moment from 'moment';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import VisittkortElement from '../VisittkortElement';

import { Familierelasjon, getPartner, Person, Sivilstand, SivilstandTyper } from '../../../../../models/person/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import HeartIkon from '../../../../../svg/Heart';

interface Props {
    person: Person;
}

interface PartnerProps {
    relasjon: Familierelasjon;
    sivilstand: Sivilstand;
}

function Sivilstand(props: {sivilstand: Sivilstand}) {
    if (props.sivilstand.value === SivilstandTyper.Ugift) {
        return <>{props.sivilstand.beskrivelse}</>;
    }
    const relasjonFraOgMed = moment(props.sivilstand.fraOgMed).format('DD.MM.YYYY');
    return (
        <>{props.sivilstand.beskrivelse} ({relasjonFraOgMed})</>
    );
}

function Partner({relasjon, sivilstand}: PartnerProps) {
    return (
        <>
            <Undertekst><Sivilstand sivilstand={sivilstand}/></Undertekst>
            <Undertekst><NavnOgAlder relasjon={relasjon}/></Undertekst>
            <Undertekst>{relasjon.tilPerson.fødselsnummer}</Undertekst>
            <Undertekst><BorMedBruker harSammeBosted={relasjon.harSammeBosted}/></Undertekst>
        </>
    );
}

function SivilstandVisning({person}: Props) {
    const partner = getPartner(person);
    const {sivilstand} = person;

    if (!partner) {
        return <Undertekst><Sivilstand sivilstand={sivilstand}/></Undertekst>;
    }

    return (
        <Partner relasjon={partner} sivilstand={sivilstand}/>
    );
}

function SivilstandWrapper({person}: Props) {
    return (
        <VisittkortElement beskrivelse="Sivilstand" ikon={<HeartIkon />}>
            <SivilstandVisning person={person}/>
        </VisittkortElement>
    );
}

export default SivilstandWrapper;