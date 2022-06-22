import * as React from 'react';
import EtikettGraa from '../../../../components/EtikettGraa';
import { formaterDato } from '../../../../utils/string-utils';
import { SistEndret } from '../PersondataDomain';

interface Props {
    sistEndret: SistEndret | null;
}

function Endringstekst({ sistEndret }: Props) {
    if (!sistEndret) {
        return null;
    }

    const formatertDato = formaterDato(new Date(sistEndret.tidspunkt));
    const endretAvSystemKilde = sistEndret.system;
    const kilde = sistEndret.kilde.length > 0 ? `(kilde: ${sistEndret.kilde})` : null;

    return (
        <EtikettGraa>
            Endret {formatertDato} av {endretAvSystemKilde} {kilde}
        </EtikettGraa>
    );
}

export default Endringstekst;
