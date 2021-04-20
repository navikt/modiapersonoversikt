import * as React from 'react';
import { Periode } from '../../models/tid';
import { formaterDato } from '../../utils/string-utils';
import EtikettGraa from '../EtikettGraa';

interface Props {
    periode: Periode;
}

function VisPeriode({ periode }: Props) {
    const fra = formaterDato(periode.fra);
    const til = formaterDato(periode.til);
    return (
        <EtikettGraa>
            Gyldig: {fra} - {til}
        </EtikettGraa>
    );
}

export default VisPeriode;
