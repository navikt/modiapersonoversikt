import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { AdresseBeskyttelse, KodeBeskrivelse } from '../../PersondataDomain';

interface Props {
    adressebeskyttelser: KodeBeskrivelse<AdresseBeskyttelse>[];
}

function DiskresjonskodeEtikett({ adressebeskyttelser }: Props) {
    const adressebeskyttelse = adressebeskyttelser.firstOrNull();
    switch (adressebeskyttelse?.kode) {
        case AdresseBeskyttelse.KODE6:
            return <EtikettBase type={'advarsel'}>{adressebeskyttelse?.beskrivelse}</EtikettBase>;
        case AdresseBeskyttelse.KODE6_UTLAND:
            return <EtikettBase type={'advarsel'}>{adressebeskyttelse?.beskrivelse}</EtikettBase>;
        case AdresseBeskyttelse.KODE7:
            return <EtikettBase type={'advarsel'}>{adressebeskyttelse?.beskrivelse}</EtikettBase>;
        default:
            return null;
    }
}

export default DiskresjonskodeEtikett;
