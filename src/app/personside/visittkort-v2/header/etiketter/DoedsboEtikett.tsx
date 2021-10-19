import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { Dodsbo } from '../../PersondataDomain';

interface Props {
    dodsbo: Dodsbo[];
}

function DoedsboEtikett({ dodsbo }: Props) {
    if (dodsbo.isEmpty()) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Dødsbo</EtikettBase>;
}

export default DoedsboEtikett;
