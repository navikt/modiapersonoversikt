import * as React from 'react';
import { Verge } from '../../../../../models/vergemal/vergemal';
import EtikettBase from 'nav-frontend-etiketter';

function VergemalsEtikett(props: { vergemål: Verge[] }) {
    if (props.vergemål.length === 0) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

export default VergemalsEtikett;
