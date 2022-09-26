import * as React from 'react';
import EmailIkon from '../../../../../../svg/Email';
import VisittkortElement from '../../VisittkortElement';
import { KontaktInformasjon } from '../../../PersondataDomain';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';
import { Feilmelding } from 'nav-frontend-typografi';

interface Props {
    harFeilendeSystem: boolean;
    kontaktinformasjon: KontaktInformasjon | null;
}

function Epost({ harFeilendeSystem, kontaktinformasjon }: Props) {
    if (harFeilendeSystem) {
        return (
            <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
                <Feilmelding>Feilet ved uthenting av data fra Kontakt- og reservasjonsregisteret</Feilmelding>
            </VisittkortElement>
        );
    }
    if (!kontaktinformasjon) {
        return null;
    }
    const epost = kontaktinformasjon.epost?.value ?? null;
    const sistOppdatert = kontaktinformasjon.epost?.sistOppdatert
        ? formaterDato(kontaktinformasjon.epost.sistOppdatert)
        : null;

    return (
        <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
            <DigitalKontaktinformasjon
                erReservert={kontaktinformasjon.erReservert}
                kontaktinformasjonVerdi={epost}
                sistOppdatert={sistOppdatert}
            />
        </VisittkortElement>
    );
}

export default Epost;
