import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { Fullmakt } from './../../PersondataDomain';

interface Props {
    fullmakt: Fullmakt[];
}

function FullmaktEtikett({ fullmakt }: Props) {
    if (fullmakt.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Fullmakt</EtikettBase>;
}

export default FullmaktEtikett;
