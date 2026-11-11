import EtikettBase from 'nav-frontend-etiketter';
import type { Verge } from 'src/models/person/persondata';

interface Props {
    vergemal: Verge[];
}

function VergemalsEtikett({ vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

export default VergemalsEtikett;
