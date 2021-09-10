import { Adresse } from '../../../../../models/personPdl/person';
import { DeltBosted } from '../../../../../models/personPdl/deltBosted';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { formaterDato } from '../../../../../utils/string-utils';
import VisittkortElement from '../../../visittkort/body/VisittkortElement';
import { VisittkortGruppe } from '../../../visittkort/body/VisittkortStyles';
import Infotegn from '../../../../../svg/Info';

function harAdresse(adresse: Adresse | null) {
    return adresse !== undefined;
}

function getAdresse(deltBosted: DeltBosted) {
    if (!deltBosted?.adresse) {
        return null;
    }

    const { adresse } = deltBosted;

    const gateadresse = `${adresse.linje1} ${adresse?.linje2} ${adresse?.linje3}`;

    return (
        <div key={adresse.linje1}>
            <Normaltekst>{gateadresse}</Normaltekst>
        </div>
    );
}

function DeltBostedElement(props: { deltBosted: DeltBosted }) {
    const startDato = props.deltBosted.startdatoForKontrakt
        ? formaterDato(props.deltBosted.startdatoForKontrakt)
        : 'dato ikke funnet';
    const sluttDato = props.deltBosted.sluttdatoForKontrakt
        ? formaterDato(props.deltBosted.sluttdatoForKontrakt)
        : 'dato ikke funnet';
    const ukjentBosted = !harAdresse(props.deltBosted.adresse) ? <Normaltekst>Ukjent bosted</Normaltekst> : undefined;

    return (
        <VisittkortElement>
            <Normaltekst>{getAdresse(props.deltBosted) ?? ukjentBosted}</Normaltekst>
            <Normaltekst>Gyldig fra og med {startDato}</Normaltekst>
            <Normaltekst>Gyldig til og med {sluttDato}</Normaltekst>
        </VisittkortElement>
    );
}

function DeltBostedWrapper(props: { deltbosted: DeltBosted[] }) {
    if (!props.deltbosted || props.deltbosted.length == 0) {
        return null;
    }

    const delteBosteder = props.deltbosted.map((deltbosted, index) => (
        <DeltBostedElement key={index} deltBosted={deltbosted} />
    ));

    return (
        <VisittkortGruppe tittel={'Delt Bosted'} ikon={<Infotegn />}>
            {delteBosteder}
        </VisittkortGruppe>
    );
}

export default DeltBostedWrapper;
