import * as React from 'react';
import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import {
    erDød,
    Familierelasjon,
    getPartner,
    Person,
    Sivilstand as SivilstandInterface,
    SivilstandTyper
} from '../../../../../models/person/person';
import NavnOgAlder from '../../../../../components/person/NavnOgAlder';
import BorMedBruker from '../../../../../components/person/HarSammeBosted';
import HeartIkon from '../../../../../svg/Heart';
import { Diskresjonskode } from './common/Diskresjonskode';

interface Props {
    person: Person;
}

interface PartnerProps {
    relasjon: Familierelasjon;
    sivilstand: SivilstandInterface;
}

function Sivilstand(props: { sivilstand: SivilstandInterface }) {
    if (props.sivilstand.kodeRef === SivilstandTyper.Ugift) {
        return <>{props.sivilstand.beskrivelse}</>;
    }
    const relasjonFraOgMed = dayjs(props.sivilstand.fraOgMed).format('DD.MM.YYYY');
    const nullDatoFraTPS = '01.01.9999';

    if (relasjonFraOgMed !== nullDatoFraTPS) {
        return (
            <>
                {props.sivilstand.beskrivelse} ({relasjonFraOgMed})
            </>
        );
    } else {
        return <>{props.sivilstand.beskrivelse}</>;
    }
}

function Partner({ relasjon, sivilstand }: PartnerProps) {
    const erDod = erDød(relasjon.tilPerson.personstatus);
    return (
        <>
            <Normaltekst>
                <Sivilstand sivilstand={sivilstand} />
            </Normaltekst>
            <Diskresjonskode diskresjonskode={relasjon.tilPerson.diskresjonskode} />
            <Normaltekst>
                <NavnOgAlder relasjon={relasjon} />
            </Normaltekst>
            <Normaltekst>{relasjon.tilPerson.fødselsnummer || ''}</Normaltekst>
            <Normaltekst>
                <BorMedBruker harSammeBosted={relasjon.harSammeBosted} skalVise={!erDod} />
            </Normaltekst>
        </>
    );
}

function SivilstandVisning({ person }: Props) {
    const partner = getPartner(person);
    const { sivilstand } = person;

    if (!partner) {
        return (
            <Normaltekst>
                <Sivilstand sivilstand={sivilstand} />
            </Normaltekst>
        );
    }

    return <Partner relasjon={partner} sivilstand={sivilstand} />;
}

function SivilstandWrapper({ person }: Props) {
    return (
        <VisittkortElement beskrivelse="Sivilstand" ikon={<HeartIkon />}>
            <SivilstandVisning person={person} />
        </VisittkortElement>
    );
}

export default SivilstandWrapper;
