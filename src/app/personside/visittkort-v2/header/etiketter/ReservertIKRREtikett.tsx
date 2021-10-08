import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { DigitalKontaktinformasjon } from '../../PersondataDomain';

interface Props {
    kontaktOgReservasjon: DigitalKontaktinformasjon | null;
}

function ReservertIKRREtikett({ kontaktOgReservasjon }: Props) {
    if (kontaktOgReservasjon?.reservasjon === 'true') {
        return <EtikettBase type="fokus">Reservert i KRR</EtikettBase>;
    } else if (
        kontaktOgReservasjon &&
        !kontaktOgReservasjon.epostadresse?.value &&
        !kontaktOgReservasjon.mobiltelefonnummer?.value
    ) {
        return <EtikettBase type="fokus">Ikke registrert i KRR</EtikettBase>;
    }
    return null;
}

export default ReservertIKRREtikett;
