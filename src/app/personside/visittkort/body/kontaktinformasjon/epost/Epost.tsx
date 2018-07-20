import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../../VisittkortElement';
import { KRRKontaktinformasjon, KontaktinformasjonVerdi } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { formaterDato } from '../../../../../../utils/dateUtils';
import EtikettMini from '../../../../../../components/EtikettMini';
import EmailIkon from '../../../../../../svg/Email';
import { RestReducer } from '../../../../../../redux/restReducers/restReducer';

interface EpostProps {
    epost: KontaktinformasjonVerdi;
}

function Epost({epost}: EpostProps) {
    const formatertDato = formaterDato(epost.sistOppdatert);
    return (
        <>
            <Undertekst>{epost.value}</Undertekst>
            <EtikettMini>Endret {formatertDato}</EtikettMini>
        </>
    );
}

interface EpostVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

export function EpostVisning({kontaktinformasjon}: EpostVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return <Undertekst>Reservert mot kommunikasjon på nett</Undertekst>;
    } else if (kontaktinformasjon.epost) {
        return <Epost epost={kontaktinformasjon.epost}/>;
    } else {
        return <Undertekst>Ikke registrert</Undertekst>;
    }
}

interface EpostWrapperProps {
    kontaktinformasjonReducer: RestReducer<KRRKontaktinformasjon>;
}

function EpostWrapper ({kontaktinformasjonReducer}: EpostWrapperProps) {
    return (
        <VisittkortElement beskrivelse="E-post Kontakt- og reservasjonsregisteret" ikon={<EmailIkon />}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <EpostVisning kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;
