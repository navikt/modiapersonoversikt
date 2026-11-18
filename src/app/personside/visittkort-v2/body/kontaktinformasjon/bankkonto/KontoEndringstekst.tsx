import type { SistEndret } from 'src/models/person/persondata';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { formaterDato } from '../../../../../../utils/string-utils';

interface Props {
    sistEndret: SistEndret | null;
}
function KontoEndringsTekst({ sistEndret }: Props) {
    if (!sistEndret) {
        return null;
    }

    const formatertdato = formaterDato(new Date(sistEndret.tidspunkt));
    return <EtikettGraa>Endret {formatertdato} </EtikettGraa>;
}
export default KontoEndringsTekst;
