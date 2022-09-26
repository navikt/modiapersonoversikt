import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { KontaktInformasjon } from '../../PersondataDomain';

interface Props {
    kontaktInformasjon: KontaktInformasjon | null;
}

function ReservertIKRREtikett(props: Props) {
    const { kontaktInformasjon } = props;
    if (kontaktInformasjon?.erReservert) {
        return <EtikettBase type="fokus">Reservert i KRR</EtikettBase>;
    } else if (kontaktInformasjon && !kontaktInformasjon.epost?.value && !kontaktInformasjon.mobil?.value) {
        return <EtikettBase type="fokus">Ikke registrert i KRR</EtikettBase>;
    }
    return null;
}

export default ReservertIKRREtikett;
