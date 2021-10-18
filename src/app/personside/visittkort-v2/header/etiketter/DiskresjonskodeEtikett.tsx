import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { AdresseBeskyttelse } from '../../PersondataDomain';

interface Props {
    adressebeskyttelse: AdresseBeskyttelse;
}

function DiskresjonskodeEtikett({ adressebeskyttelse }: Props) {
    switch (adressebeskyttelse) {
        case AdresseBeskyttelse.KODE6:
            return <EtikettBase type={'advarsel'}>Kode 6</EtikettBase>;
        case AdresseBeskyttelse.KODE6_UTLAND:
            return <EtikettBase type={'advarsel'}>Kode 6 Utland</EtikettBase>;
        case AdresseBeskyttelse.KODE7:
            return <EtikettBase type={'advarsel'}>Kode 7</EtikettBase>;
        default:
            return null;
    }
}

export default DiskresjonskodeEtikett;
