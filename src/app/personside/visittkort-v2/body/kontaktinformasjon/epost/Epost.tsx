import * as React from 'react';
import EmailIkon from '../../../../../../svg/Email';
import VisittkortElement from '../../VisittkortElement';
import { DigitalKontaktinformasjon as DigitalKontaktinformasjonInterface } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';
import FeilendeSystemAdvarsel from '../../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    kontaktinformasjon: DigitalKontaktinformasjonInterface | null;
}

function Epost({ feilendeSystem, kontaktinformasjon }: Props) {
    if (feilendeSystem) {
        return (
            <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
                <FeilendeSystemAdvarsel>
                    Feilet ved uthenting av data fra Kontakt- og reservasjonsregisteret
                </FeilendeSystemAdvarsel>
            </VisittkortElement>
        );
    }
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
