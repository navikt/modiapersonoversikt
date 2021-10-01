import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { DigitalKontaktinformasjon } from '../../PersondataDomain';

function getEtikett(kontaktOgReservasjon: DigitalKontaktinformasjon) {
    if (kontaktOgReservasjon.reservasjon === 'true') {
        return <EtikettBase type="fokus">Reservert i KRR</EtikettBase>;
    }
    if (!kontaktOgReservasjon.epostadresse?.value && !kontaktOgReservasjon.mobiltelefonnummer?.value) {
        return <EtikettBase type="fokus">Ikke registrert i KRR</EtikettBase>;
    }
    return null;
}

interface Props {
    kontaktOgReservasjon: DigitalKontaktinformasjon | null;
}

function ReservertIKRREtikett({ kontaktOgReservasjon }: Props) {
    return kontaktOgReservasjon ? getEtikett(kontaktOgReservasjon) : null;
}

export default ReservertIKRREtikett;
