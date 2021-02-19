import * as React from 'react';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import EtikettBase from 'nav-frontend-etiketter';

function VergemålsEtikett(props: { vergemål?: Vergemal }) {
    if (!props.vergemål?.verger || props.vergemål.verger.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

export default VergemålsEtikett;
