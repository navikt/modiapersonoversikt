import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { Doedsbo } from '../../../../../models/person/doedsbo';

function DoedsboEtikett(props: { doedsbo?: Doedsbo[] }) {
    if (!props.doedsbo || props.doedsbo.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Dødsbo</EtikettBase>;
}

export default DoedsboEtikett;
