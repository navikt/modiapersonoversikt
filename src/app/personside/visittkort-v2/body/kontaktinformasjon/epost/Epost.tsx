import * as React from 'react';
import EmailIkon from '../../../../../../svg/Email';
import VisittkortElement from '../../VisittkortElement';
import { DigitalKontaktinformasjon as DigitalKontaktinformasjonInterface } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';

interface Props {
    kontaktinformasjon: DigitalKontaktinformasjonInterface | null;
}

function Epost({ kontaktinformasjon }: Props) {
    if (!kontaktinformasjon) {
        return null;
    }
    const epost = kontaktinformasjon.epostadresse?.value ?? null;
    const sistOppdatert = kontaktinformasjon.epostadresse?.sistOppdatert
        ? formaterDato(kontaktinformasjon.epostadresse.sistOppdatert)
        : null;

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
