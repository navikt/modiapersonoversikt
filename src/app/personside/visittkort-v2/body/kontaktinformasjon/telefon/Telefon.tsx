import { Feilmelding } from 'nav-frontend-typografi';
import PhoneIkon from '../../../../../../svg/Phone';
import { formaterDato } from '../../../../../../utils/string-utils';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import type { KontaktInformasjon } from '../../../PersondataDomain';
import VisittkortElement from '../../VisittkortElement';
import DigitalKontaktinformasjon from '../DigitalKontaktinformasjon';

interface Props {
    harFeilendeSystem: boolean;
    kontaktinformasjon: KontaktInformasjon | null;
}

function Telefon({ harFeilendeSystem, kontaktinformasjon }: Props) {
    if (harFeilendeSystem) {
        return (
            <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
                <Feilmelding>Feilet ved uthenting av data fra Kontakt- og reservasjonsregisteret</Feilmelding>
            </VisittkortElement>
        );
    }

    if (!kontaktinformasjon) {
        return null;
    }

    const telefonnummer = formaterMobiltelefonnummer(kontaktinformasjon.mobil?.value ?? '');
    const sistOppdatert = kontaktinformasjon.mobil?.sistOppdatert
        ? formaterDato(kontaktinformasjon.mobil.sistOppdatert)
        : null;

    return (
        <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
            <DigitalKontaktinformasjon
                erReservert={kontaktinformasjon.erReservert?.value}
                reservasjonOppdatert={kontaktinformasjon.erReservert?.sistOppdatert}
                kontaktinformasjonVerdi={telefonnummer}
                sistOppdatert={sistOppdatert}
            />
        </VisittkortElement>
    );
}

export default Telefon;
