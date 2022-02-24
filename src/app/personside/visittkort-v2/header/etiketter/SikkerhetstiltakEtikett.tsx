import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { Sikkerhetstiltak } from '../../PersondataDomain';

interface Props {
    sikkerhetstiltak: Sikkerhetstiltak[];
}

function SikkerhetstiltakEtikett({ sikkerhetstiltak }: Props) {
    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return <EtikettBase type="advarsel">Sikkerhetstiltak</EtikettBase>;
}

export default SikkerhetstiltakEtikett;
