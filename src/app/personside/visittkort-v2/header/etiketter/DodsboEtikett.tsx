import EtikettBase from 'nav-frontend-etiketter';
import type { Dodsbo } from 'src/models/person/persondata';

interface Props {
    dodsbo: Dodsbo[];
}

function DodsboEtikett({ dodsbo }: Props) {
    if (dodsbo.isEmpty()) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Dødsbo</EtikettBase>;
}

export default DodsboEtikett;
