import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/string-utils';
import { VisittkortGruppe } from '../VisittkortStyles';
import * as React from 'react';
import { DeltBosted, DeltBostedAdresse } from '../../../../../models/deltBosted';
import Infotegn from '../../../../../svg/Info';

function harAdresse(adresse?: DeltBostedAdresse) {
    return adresse !== undefined;
}

function getAdresse(deltBosted?: DeltBosted) {
    if (!deltBosted?.adresse) {
        return null;
    }

    const { adresse } = deltBosted;

    const gateadresse = `${adresse.adressenavn} ${adresse.husnummer || ''}${adresse.husbokstav || ''}`;
    const poststed = adresse.bydelsnummer
        ? `${adresse.postnummer} (${adresse.bydelsnummer}) ${adresse.poststed}`
        : `${adresse.postnummer} ${adresse.poststed}`;
    const coAdresse = adresse.coAdressenavn ? `C/O ${adresse.coAdressenavn}` : '';
    const tilleggsnavn = adresse?.tilleggsnavn ?? '';
    return (
        <div key={adresse.adressenavn}>
            <Normaltekst>{gateadresse}</Normaltekst>
            <Normaltekst>{tilleggsnavn}</Normaltekst>
            <Normaltekst>{poststed}</Normaltekst>
            <Normaltekst>{coAdresse}</Normaltekst>
        </div>
    );
}

function DeltBostedElement(props: { deltbosted: DeltBosted }) {
    const startdato = props.deltbosted.startdatoForKontrakt
        ? formaterDato(props.deltbosted.startdatoForKontrakt)
        : 'dato ikke funnet';
    const sluttdato = props.deltbosted.sluttdatoForKontrakt
        ? formaterDato(props.deltbosted.sluttdatoForKontrakt)
        : 'dato ikke funnet';
    const ukjentBosted = !harAdresse(props.deltbosted.adresse) ? (
        <Normaltekst>Ukjent bosted i {props.deltbosted.ukjentBosted?.bostedskommune}</Normaltekst>
    ) : (
        undefined
    );

    return (
        <VisittkortElement>
            {getAdresse(props.deltbosted) ?? ukjentBosted}
            <Normaltekst>Gyldig fra og med {startdato}</Normaltekst>
            <Normaltekst>Gyldig til og med {sluttdato}</Normaltekst>
        </VisittkortElement>
    );
}

function DeltBostedWrapper(props: { deltbosted: DeltBosted[] }) {
    if (!props.deltbosted || props.deltbosted.length === 0) {
        return null;
    }

    const delteBosteder = props.deltbosted.map((deltbosted, index) => (
        <DeltBostedElement key={index} deltbosted={deltbosted} />
    ));

    return (
        <VisittkortGruppe tittel={'Delt Bosted'} ikon={<Infotegn />}>
            {delteBosteder}
        </VisittkortGruppe>
    );
}

export default DeltBostedWrapper;
