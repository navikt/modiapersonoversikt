import { Feilmelding } from 'nav-frontend-typografi';
import EmailIkon from '../../../../../../svg/Email';
import { formaterDato } from '../../../../../../utils/string-utils';
import type { KontaktInformasjon } from '../../../PersondataDomain';
import VisittkortElement from '../../VisittkortElement';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';

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
                erReservert={kontaktinformasjon.erReservert?.value}
                reservasjonOppdatert={kontaktinformasjon.erReservert?.sistOppdatert}
                kontaktinformasjonVerdi={epost}
                sistOppdatert={sistOppdatert}
            />
        </VisittkortElement>
    );
}

export default Epost;
