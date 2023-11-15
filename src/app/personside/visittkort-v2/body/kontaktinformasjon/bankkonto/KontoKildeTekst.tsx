import * as React from 'react';
import EtikettGraa from '../../../../../../components/EtikettGraa';

interface Props {
    kilde: string | null;
}
function KontoKildeekst({ kilde }: Props) {
    if (!kilde) {
        return null;
    }

    return <EtikettGraa>Kilde {kilde}</EtikettGraa>;
}
export default KontoKildeekst;
