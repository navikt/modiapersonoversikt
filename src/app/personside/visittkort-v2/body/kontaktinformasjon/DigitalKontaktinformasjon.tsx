import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import EtikettGraa from '../../../../../components/EtikettGraa';

interface Props {
    erReservert: boolean | null;
    kontaktinformasjonVerdi: string | null;
    sistOppdatert: string | null;
}

function DigitalKontaktinformasjon({ erReservert, kontaktinformasjonVerdi, sistOppdatert }: Props) {
    if (erReservert) {
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
                <EtikettGraa>Endret {sistOppdatert} i Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    }
}

export default DigitalKontaktinformasjon;
