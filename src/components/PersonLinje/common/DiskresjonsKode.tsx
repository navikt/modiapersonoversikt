import { BodyShort } from '@navikt/ds-react';
import type { AdresseBeskyttelse } from 'src/lib/types/modiapersonoversikt-api';
import { harDiskresjonskode } from '../utils';

interface Props {
    adressebeskyttelse: AdresseBeskyttelse[];
}

function Diskresjonskode({ adressebeskyttelse }: Props) {
    const beskyttelse = adressebeskyttelse.firstOrNull();
    if (!beskyttelse || !harDiskresjonskode(adressebeskyttelse)) {
        return null;
    }

    return <BodyShort>{beskyttelse.beskrivelse}</BodyShort>;
}

export default Diskresjonskode;
