import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/string-utils';
import { VisittkortGruppe } from '../VisittkortStyles';
import * as React from 'react';
import Infotegn from '../../../../../svg/Info';
import { DeltBosted } from '../../PersondataDomain';
import { Adresseinfo } from '../AdresseInfo';

interface Props {
    deltBosted: DeltBosted[];
}

function DeltBostedElement(props: { deltBosted: DeltBosted }) {
    if (!props.deltBosted.adresse) {
        return null;
    }

    const startdato = formaterDato(props.deltBosted.startdatoForKontrakt);
    const sluttdato = props.deltBosted.sluttdatoForKontrakt
        ? formaterDato(props.deltBosted.sluttdatoForKontrakt)
        : 'ukjent dato';

    return (
        <VisittkortElement>
            <Adresseinfo adresse={props.deltBosted.adresse} />
            <Normaltekst>Gyldig fra og med {startdato}</Normaltekst>
            <Normaltekst>Gyldig til og med {sluttdato}</Normaltekst>
        </VisittkortElement>
    );
}

function DeltBostedWrapper({ deltBosted }: Props) {
    if (deltBosted.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Delt Bosted'} ikon={<Infotegn />}>
            {deltBosted.map((deltBosted, index) => (
                <DeltBostedElement key={index} deltBosted={deltBosted} />
            ))}
        </VisittkortGruppe>
    );
}

export default DeltBostedWrapper;
