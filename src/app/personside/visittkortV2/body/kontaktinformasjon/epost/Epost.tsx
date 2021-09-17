import * as React from 'react';
import { DigitalKontaktinformasjon } from '../../../../../../models/personPdl/digitalKontaktinformasjon';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../../utils/string-utils';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import EmailIkon from '../../../../../../svg/Email';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../../../../models/personPdl/person';

interface Props {
    person: Person;
}

function EpostVisning({ kontaktinformasjon }: { kontaktinformasjon: DigitalKontaktinformasjon }) {
    if (kontaktinformasjon.reservasjon === 'true') {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <Normaltekst>I Kontakt- og reservasjonsregisteret</Normaltekst>
            </>
        );
    } else if (kontaktinformasjon.epostadresse) {
        const formatertDato = kontaktinformasjon.epostadresse.sistOppdatert
            ? formaterDato(kontaktinformasjon.epostadresse.sistOppdatert)
            : null;
        return (
            <>
                <Normaltekst>{kontaktinformasjon.epostadresse.value}</Normaltekst>
                <EtikettGraa>Endret {formatertDato} i Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else {
        return <Normaltekst>Ikke registerert</Normaltekst>;
    }
}

function Epost(props: Props) {
    const kontaktinformasjon = props.person.kontaktOgReservasjon;

    if (!kontaktinformasjon) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
            <EpostVisning kontaktinformasjon={kontaktinformasjon} />
        </VisittkortElement>
    );
}

export default Epost;
