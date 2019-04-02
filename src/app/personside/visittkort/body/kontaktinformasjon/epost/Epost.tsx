import * as React from 'react';

import VisittkortElement from '../../VisittkortElement';
import { KontaktinformasjonVerdi, KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import EmailIkon from '../../../../../../svg/Email';
import { Loaded, RestResource } from '../../../../../../redux/restReducers/restResource';
import { Normaltekst } from 'nav-frontend-typografi';

interface EpostProps {
    epost: KontaktinformasjonVerdi;
}

function Epost({ epost }: EpostProps) {
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

export function EpostVisning({ kontaktinformasjon }: EpostVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGrå>I Kontakt- og reservasjonsregisteret</EtikettGrå>
            </>
        );
    } else if (kontaktinformasjon.epost) {
        return <Epost epost={kontaktinformasjon.epost} />;
    } else {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }
}

interface EpostWrapperProps {
    kontaktinformasjonResource: RestResource<KRRKontaktinformasjon>;
}

function EpostWrapper({ kontaktinformasjonResource }: EpostWrapperProps) {
    return (
        <VisittkortElement beskrivelse="E-post" ikon={<EmailIkon />}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonResource]}>
                <EpostVisning kontaktinformasjon={(kontaktinformasjonResource as Loaded<KRRKontaktinformasjon>).data} />
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;
