import * as React from 'react';
import EtikettGraa from '../../../../components/EtikettGraa';
import { endretAvTekst } from '../../../../utils/endretAvUtil';
import { formaterDato } from '../../../../utils/string-utils';
import { SistEndret } from '../PersondataDomain';

interface Props {
    sistEndret: SistEndret | null;
}

function Endringstekst({ sistEndret }: Props) {
    if (!sistEndret) {
        return null;
    }

    const formatertdato = formaterDato(new Date(sistEndret.tidspunkt));
    const endretAv = endretAvTekst(sistEndret.ident);
    const kilde = sistEndret.kilde.length > 0 ? `(kilde: ${sistEndret.kilde})` : null;

    return (
        <EtikettGraa>
            Endret {formatertdato} {endretAv} {kilde}
        </EtikettGraa>
    );
}

export default Endringstekst;
