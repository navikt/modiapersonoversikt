import EtikettBase from 'nav-frontend-etiketter';
import type { Fullmakt } from './../../PersondataDomain';

interface Props {
    fullmakt: Fullmakt[];
}

function FullmaktEtikett({ fullmakt }: Props) {
    if (fullmakt.isEmpty()) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Fullmakt</EtikettBase>;
}

export default FullmaktEtikett;
