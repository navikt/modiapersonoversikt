import EtikettBase from 'nav-frontend-etiketter';
import type { Person } from '../../PersondataDomain';

interface Props {
    fullmektige: Person['fullmektige'];
}

function FullmaktEtikett({ fullmektige }: Props) {
    if (fullmektige.isEmpty()) {
        return null;
    }

    return <EtikettBase type="fokus">Fullmakt</EtikettBase>;
}

export default FullmaktEtikett;
