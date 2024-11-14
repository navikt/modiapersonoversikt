import * as React from 'react';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { formaterDato } from '../../../../../../utils/string-utils';
import { SistEndret } from '../../../PersondataDomain';

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
