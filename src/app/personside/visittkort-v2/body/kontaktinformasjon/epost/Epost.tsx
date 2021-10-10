import * as React from 'react';
import EmailIkon from '../../../../../../svg/Email';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';

interface Props {
    person: Person;
}

function Epost({ person }: Props) {
    const kontaktinformasjon = person.kontaktOgReservasjon;

    if (!kontaktinformasjon) {
        return null;
    }
    const epost = kontaktinformasjon.epostadresse?.value ?? null;
    const sistOppdatert = formaterDato(kontaktinformasjon.epostadresse?.sistOppdatert ?? '');

    return (
        <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
            <DigitalKontaktinformasjon
                reservasjon={kontaktinformasjon.reservasjon}
                kontaktinformasjonVerdi={epost}
                sistOppdatert={sistOppdatert}
            />
        </VisittkortElement>
    );
}

export default Epost;
