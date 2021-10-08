import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import PhoneIkon from '../../../../../../svg/Phone';
import { formaterDato } from '../../../../../../utils/string-utils';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import VisittkortElement from '../../VisittkortElement';
import { DigitalKontaktinformasjon, Person } from '../../../PersondataDomain';

interface Props {
    person: Person;
}

function MobiltelefonVisning({ kontaktinformasjon }: { kontaktinformasjon: DigitalKontaktinformasjon }) {
    if (kontaktinformasjon.reservasjon === 'true') {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGraa>I Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else if (!kontaktinformasjon.mobiltelefonnummer?.value) {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    } else {
        const formatertDato = kontaktinformasjon.mobiltelefonnummer.sistOppdatert
            ? formaterDato(kontaktinformasjon.mobiltelefonnummer.sistOppdatert)
            : null;
        const formatertTelefonnummer = kontaktinformasjon.mobiltelefonnummer.value
            ? formaterMobiltelefonnummer(kontaktinformasjon.mobiltelefonnummer.value)
            : null;
        return (
            <>
                <Normaltekst>{formatertTelefonnummer}</Normaltekst>
                <EtikettGraa>Endret {formatertDato} i Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    }
}

function Telefon(props: Props) {
    const kontaktinformasjon = props.person.kontaktOgReservasjon;

    if (!kontaktinformasjon) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
            <MobiltelefonVisning kontaktinformasjon={kontaktinformasjon} />
        </VisittkortElement>
    );
}

export default Telefon;
