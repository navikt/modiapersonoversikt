import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/string-utils';
import { VisittkortGruppe } from '../VisittkortStyles';
import * as React from 'react';
import Infotegn from '../../../../../svg/Info';
import { DeltBosted } from '../../PersondataDomain';
import { Adresseinfo } from '../AdresseInfo';

function DeltBostedElement(props: { deltBosted: DeltBosted }) {
    if (!props.deltBosted.adresse) {
        return null;
    }

    const startdato = props.deltBosted.startdatoForKontrakt
        ? formaterDato(props.deltBosted.startdatoForKontrakt)
        : 'dato ikke funnet';
    const sluttdato = props.deltBosted.sluttdatoForKontrakt
        ? formaterDato(props.deltBosted.sluttdatoForKontrakt)
        : 'dato ikke funnet';
    // TODO: Bør vi håndtere ukjent bosted her også og ikke kun i backend?
    return (
        <VisittkortElement>
            <Adresseinfo adresse={props.deltBosted.adresse} />
            <Normaltekst>Gyldig fra og med {startdato}</Normaltekst>
            <Normaltekst>Gyldig til og med {sluttdato}</Normaltekst>
        </VisittkortElement>
    );
}

function DeltBostedWrapper(props: { deltBosted: DeltBosted[] }) {
    if (props.deltBosted.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Delt Bosted'} ikon={<Infotegn />}>
            {props.deltBosted.map((deltBosted, index) => (
                <DeltBostedElement key={index} deltBosted={deltBosted} />
            ))}
        </VisittkortGruppe>
    );
}

export default DeltBostedWrapper;
