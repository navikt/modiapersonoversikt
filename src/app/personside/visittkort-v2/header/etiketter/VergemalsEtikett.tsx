import * as React from 'react';
import { Verge } from '../../PersondataDomain';
import EtikettBase from 'nav-frontend-etiketter';

interface Props {
    vergemal: Verge[];
}

function VergemalsEtikett({ vergemal }: Props) {
    if (vergemal.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

export default VergemalsEtikett;
