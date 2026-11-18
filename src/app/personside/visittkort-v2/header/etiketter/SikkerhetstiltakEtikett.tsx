import EtikettBase from 'nav-frontend-etiketter';
import type { Sikkerhetstiltak } from 'src/models/person/persondata';

interface Props {
    sikkerhetstiltak: Sikkerhetstiltak[];
}

function SikkerhetstiltakEtikett({ sikkerhetstiltak }: Props) {
    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return <EtikettBase type="advarsel">Sikkerhetstiltak</EtikettBase>;
}

export default SikkerhetstiltakEtikett;
