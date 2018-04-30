import * as React from 'react';
import { Periode } from '../../models/periode';
import { formaterDato } from '../../utils/dateUtils';
import EtikettMini from '../EtikettMini';

interface Props {
    periode: Periode;
}

function VisPeriode({periode}: Props) {
    const fra = formaterDato(periode.fra);
    const til = formaterDato(periode.til);
    return (
        <EtikettMini>Gyldig: {fra} - {til}</EtikettMini>
    );
}

export default VisPeriode;