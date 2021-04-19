import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { formaterDato } from '../../../../../../utils/string-utils';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import EmailIkon from '../../../../../../svg/Email';
import { Normaltekst } from 'nav-frontend-typografi';
import RestResourceConsumer from '../../../../../../rest/consumer/RestResourceConsumer';

interface EpostVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

function EpostVisning({ kontaktinformasjon }: EpostVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGraa>I Kontakt- og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else if (kontaktinformasjon.epost) {
        const formatertDato = formaterDato(kontaktinformasjon.epost.sistOppdatert);
        return (
            <>
                <Normaltekst>{kontaktinformasjon.epost.value}</Normaltekst>
                <EtikettGraa>Endret {formatertDato} i Kontakt-og reservasjonsregisteret</EtikettGraa>
            </>
        );
    } else {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }
}

function Epost() {
    return (
        <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
            <RestResourceConsumer<KRRKontaktinformasjon>
                getResource={restResources => restResources.kontaktinformasjon}
            >
                {data => <EpostVisning kontaktinformasjon={data} />}
            </RestResourceConsumer>
        </VisittkortElement>
    );
}

export default Epost;
