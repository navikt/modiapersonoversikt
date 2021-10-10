import * as React from 'react';
import PhoneIkon from '../../../../../../svg/Phone';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import { formaterDato } from '../../../../../../utils/string-utils';

interface Props {
    person: Person;
}

function Telefon({ person }: Props) {
    const kontaktinformasjon = person.kontaktOgReservasjon;

    if (!kontaktinformasjon) {
        return null;
    }

    const telefonnummer = formaterMobiltelefonnummer(kontaktinformasjon.mobiltelefonnummer?.value ?? '');
    const sistOppdatert = formaterDato(kontaktinformasjon.mobiltelefonnummer?.sistOppdatert ?? '');

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
