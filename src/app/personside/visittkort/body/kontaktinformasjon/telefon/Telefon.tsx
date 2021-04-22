import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import PhoneIkon from '../../../../../../svg/Phone';
import { Normaltekst } from 'nav-frontend-typografi';
import RestResourceConsumer from '../../../../../../rest/consumer/RestResourceConsumer';

interface MobiltelefonVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

function MobiltelefonVisning({ kontaktinformasjon }: MobiltelefonVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGraa>I Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else if (kontaktinformasjon.mobiltelefon) {
        const formatertDato = formaterDato(kontaktinformasjon.mobiltelefon.sistOppdatert);
        const formatertTelefonnummer = formaterMobiltelefonnummer(kontaktinformasjon.mobiltelefon.value);
        return (
            <>
                <Normaltekst>{formatertTelefonnummer}</Normaltekst>
                <EtikettGraa>Endret {formatertDato} i Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }
}

function Telefon() {
    return (
        <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
            <RestResourceConsumer<KRRKontaktinformasjon>
                getResource={restResources => restResources.kontaktinformasjon}
            >
                {data => <MobiltelefonVisning kontaktinformasjon={data} />}
            </RestResourceConsumer>
        </VisittkortElement>
    );
}

export default Telefon;
