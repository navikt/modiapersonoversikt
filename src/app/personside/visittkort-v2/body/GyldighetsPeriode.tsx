import * as React from 'react';
import EtikettGraa from '../../../../components/EtikettGraa';
import { GyldighetsPeriode as GyldighetsPeriodeInterface } from '../PersondataDomain';
import { hentPeriodeTekst } from '../visittkort-utils';

interface Props {
    gyldighetsPeriode: GyldighetsPeriodeInterface | null;
}

function GyldighetsPeriode({ gyldighetsPeriode }: Props) {
    if (!gyldighetsPeriode) {
        return null;
    }

    return (
        <EtikettGraa>
            Gyldig: {hentPeriodeTekst(gyldighetsPeriode.gyldigFraOgMed, gyldighetsPeriode.gyldigTilOgMed)}
        </EtikettGraa>
    );
}

export default GyldighetsPeriode;
