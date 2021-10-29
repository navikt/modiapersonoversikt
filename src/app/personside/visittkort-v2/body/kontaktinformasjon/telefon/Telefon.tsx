import * as React from 'react';
import PhoneIkon from '../../../../../../svg/Phone';
import VisittkortElement from '../../VisittkortElement';
import { DigitalKontaktinformasjon as DigitalKontaktinformasjonInterface } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import { formaterDato } from '../../../../../../utils/string-utils';

interface Props {
    kontaktinformasjon: DigitalKontaktinformasjonInterface | null;
}

function Telefon({ kontaktinformasjon }: Props) {
    if (!kontaktinformasjon) {
        return null;
    }

    const telefonnummer = formaterMobiltelefonnummer(kontaktinformasjon.mobiltelefonnummer?.value ?? '');
    const sistOppdatert = kontaktinformasjon.mobiltelefonnummer?.sistOppdatert
        ? formaterDato(kontaktinformasjon.mobiltelefonnummer.sistOppdatert)
        : null;

    return (
        <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
            <DigitalKontaktinformasjon
                reservasjon={kontaktinformasjon.reservasjon}
                kontaktinformasjonVerdi={telefonnummer}
                sistOppdatert={sistOppdatert}
            />
        </VisittkortElement>
    );
}

export default Telefon;
