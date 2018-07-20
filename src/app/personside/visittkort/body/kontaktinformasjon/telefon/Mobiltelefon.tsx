import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../../VisittkortElement';
import { Kontaktinformasjon, KontaktinformasjonVerdi } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { formaterDato } from '../../../../../../utils/dateUtils';
import EtikettMini from '../../../../../../components/EtikettMini';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import PhoneIkon from '../../../../../../svg/Phone';
import { RestReducer } from '../../../../../../redux/restReducers/restReducer';

interface MobiltelefonProps {
    mobiltelefon: KontaktinformasjonVerdi;
}

function Mobiltelefon({mobiltelefon}: MobiltelefonProps) {
    const formatertDato = formaterDato(mobiltelefon.sistOppdatert);
    const formatertTelefonnummer = formaterMobiltelefonnummer(mobiltelefon.value);
    return (
        <>
            <Undertekst>{formatertTelefonnummer}</Undertekst>
            <EtikettMini>Endret {formatertDato}</EtikettMini>
        </>
    );
}

interface MobiltelefonVisningProps {
    kontaktinformasjon: Kontaktinformasjon;
}

export function MobiltelefonVisning({kontaktinformasjon }: MobiltelefonVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return <Undertekst>Reservert mot kommunikasjon på nett</Undertekst>;
    } else if (kontaktinformasjon.mobiltelefon) {
        return <Mobiltelefon mobiltelefon={kontaktinformasjon.mobiltelefon}/>;
    } else {
        return <Undertekst>Ikke registrert</Undertekst>;
    }
}

interface MobiltelefonWrapperProps {
    kontaktinformasjonReducer: RestReducer<Kontaktinformasjon>;
}

function MobiltelefonWrapper ({kontaktinformasjonReducer}: MobiltelefonWrapperProps) {
    return (
        <VisittkortElement beskrivelse="Telefon Kontakt- og reservasjonsregisteret" ikon={<PhoneIkon />}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <MobiltelefonVisning kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default MobiltelefonWrapper;
