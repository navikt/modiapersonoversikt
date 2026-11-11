import type { GyldighetsPeriode as GyldighetsPeriodeInterface } from 'src/models/person/persondata';
import EtikettGraa from '../../../../components/EtikettGraa';
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
