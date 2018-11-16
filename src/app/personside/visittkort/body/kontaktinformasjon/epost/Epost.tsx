import * as React from 'react';

import VisittkortElement from '../../VisittkortElement';
import { KontaktinformasjonVerdi, KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { formaterDato } from '../../../../../../utils/dateUtils';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import EmailIkon from '../../../../../../svg/Email';
import { Loaded, RestReducer } from '../../../../../../redux/restReducers/restReducer';
import { Normaltekst } from 'nav-frontend-typografi';

interface EpostProps {
    epost: KontaktinformasjonVerdi;
}

function Epost({epost}: EpostProps) {
    const formatertDato = formaterDato(epost.sistOppdatert);
    return (
        <>
            <Normaltekst>{epost.value}</Normaltekst>
            <EtikettGrå>Endret {formatertDato} i Kontakt-og reservasjonsregisteret</EtikettGrå>
        </>
    );
}

interface EpostVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

export function EpostVisning({kontaktinformasjon}: EpostVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGrå>I Kontakt- og reservasjonsregisteret</EtikettGrå>
            </>
        );
    } else if (kontaktinformasjon.epost) {
        return <Epost epost={kontaktinformasjon.epost}/>;
    } else {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }
}

interface EpostWrapperProps {
    kontaktinformasjonReducer: RestReducer<KRRKontaktinformasjon>;
}

function EpostWrapper({kontaktinformasjonReducer}: EpostWrapperProps) {
    return (
        <VisittkortElement
            beskrivelse="E-post"
            ikon={<EmailIkon/>}
        >
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <EpostVisning kontaktinformasjon={(kontaktinformasjonReducer as Loaded<KRRKontaktinformasjon>).data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;
