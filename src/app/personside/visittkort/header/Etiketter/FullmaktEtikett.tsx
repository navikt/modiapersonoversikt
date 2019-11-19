import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { Fullmakt } from '../../../../../models/person/fullmakter';

function FullmaktEtikett(props: { fullmakt?: Fullmakt[] }) {
    if (!props.fullmakt || props.fullmakt.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Fullmakt</EtikettBase>;
}

export default FullmaktEtikett;
