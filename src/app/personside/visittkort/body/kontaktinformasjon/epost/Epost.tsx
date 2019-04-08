import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import { KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import EmailIkon from '../../../../../../svg/Email';
import { Normaltekst } from 'nav-frontend-typografi';
import RestResourceConsumer from '../../../../../../rest/consumer/RestResourceConsumer';

interface EpostVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

export function EpostVisning({ kontaktinformasjon }: EpostVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGrå>I Kontakt- og reservasjonsregisteret</EtikettGrå>
            </>
        );
    } else if (kontaktinformasjon.epost) {
        const formatertDato = formaterDato(kontaktinformasjon.epost.sistOppdatert);
        return (
            <>
                <Normaltekst>{kontaktinformasjon.epost.value}</Normaltekst>
                <EtikettGrå>Endret {formatertDato} i Kontakt-og reservasjonsregisteret</EtikettGrå>
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
                spinnerSize={'L'}
                getResource={restResources => restResources.kontaktinformasjon}
            >
                {data => <EpostVisning kontaktinformasjon={data} />}
            </RestResourceConsumer>
        </VisittkortElement>
    );
}

export default Epost;
