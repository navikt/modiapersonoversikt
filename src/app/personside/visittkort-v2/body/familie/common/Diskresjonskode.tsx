import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AdresseBeskyttelse, KodeBeskrivelse } from '../../../PersondataDomain';
import { harDiskresjonskode } from '../../../person-utils';

interface Props {
    adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[];
}

function Diskresjonskode({ adressebeskyttelse }: Props) {
    const beskyttelse = adressebeskyttelse.firstOrNull();
    if (!beskyttelse || !harDiskresjonskode(adressebeskyttelse)) {
        return null;
    }

    return <Normaltekst>{beskyttelse.beskrivelse}</Normaltekst>;
}

export default Diskresjonskode;
