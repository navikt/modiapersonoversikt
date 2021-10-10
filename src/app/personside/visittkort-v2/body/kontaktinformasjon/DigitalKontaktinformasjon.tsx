import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import EtikettGraa from '../../../../../components/EtikettGraa';

interface Props {
    reservasjon: string | null;
    kontaktinformasjonVerdi: string | null;
    sistOppdatert: string | null;
}

function DigitalKontaktinformasjon({ reservasjon, kontaktinformasjonVerdi, sistOppdatert }: Props) {
    if (reservasjon === 'true') {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGraa>I Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else if (!kontaktinformasjonVerdi) {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    } else {
        return (
            <>
                <Normaltekst>{kontaktinformasjonVerdi}</Normaltekst>
                {/* TODO: Kunne vi fått brukt Endringstekst.tsx på noen måte her? */}
                <EtikettGraa>Endret {sistOppdatert} i Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    }
}

export default DigitalKontaktinformasjon;
