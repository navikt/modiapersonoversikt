import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';
import * as React from 'react';
import Infotegn from '../../../../../svg/Info';
import { DeltBosted } from '../../PersondataDomain';
import Adresseinfo from '../AdresseInfo';
import GyldighetsPeriode from '../GyldighetsPeriode';

interface Props {
    deltBosted: DeltBosted[];
}

function DeltBostedElement(props: { deltBosted: DeltBosted }) {
    if (!props.deltBosted.adresse) {
        return null;
    }

    return (
        <VisittkortElement>
            <Adresseinfo adresse={props.deltBosted.adresse} />
            <GyldighetsPeriode gyldighetsPeriode={props.deltBosted.gyldighetsPeriode} />
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
