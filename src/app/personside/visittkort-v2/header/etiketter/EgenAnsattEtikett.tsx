import EtikettBase from 'nav-frontend-etiketter';
import { EgenAnsatt } from 'src/models/person/persondata';

interface Props {
    erEgenansatt: EgenAnsatt;
}

function EgenAnsattEtikett({ erEgenansatt }: Props) {
    if (erEgenansatt === EgenAnsatt.JA) {
        return <EtikettBase type={'advarsel'}>Egen ansatt</EtikettBase>;
    }
    return null;
}

export default EgenAnsattEtikett;
