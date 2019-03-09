import * as React from 'react';

import VisittkortElement from '../../VisittkortElement';
import { KontaktinformasjonVerdi, KRRKontaktinformasjon } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';
import PhoneIkon from '../../../../../../svg/Phone';
import { Loaded, RestReducer } from '../../../../../../redux/restReducers/restReducer';
import { Normaltekst } from 'nav-frontend-typografi';

interface MobiltelefonProps {
    mobiltelefon: KontaktinformasjonVerdi;
}

function Mobiltelefon({ mobiltelefon }: MobiltelefonProps) {
    const formatertDato = formaterDato(mobiltelefon.sistOppdatert);
    const formatertTelefonnummer = formaterMobiltelefonnummer(mobiltelefon.value);
    return (
        <>
            <Normaltekst>{formatertTelefonnummer}</Normaltekst>
            <EtikettGrå>Endret {formatertDato} i Kontakt- og reservasjonsregisteret</EtikettGrå>
        </>
    );
}

interface MobiltelefonVisningProps {
    kontaktinformasjon: KRRKontaktinformasjon;
}

export function MobiltelefonVisning({ kontaktinformasjon }: MobiltelefonVisningProps) {
    if ('true' === kontaktinformasjon.reservasjon) {
        return (
            <>
                <Normaltekst>Reservert</Normaltekst>
                <EtikettGrå>I Kontakt- og reservasjonsregisteret</EtikettGrå>
            </>
        );
    } else if (kontaktinformasjon.mobiltelefon) {
        return <Mobiltelefon mobiltelefon={kontaktinformasjon.mobiltelefon} />;
    } else {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }
}

interface MobiltelefonWrapperProps {
    kontaktinformasjonReducer: RestReducer<KRRKontaktinformasjon>;
}

function MobiltelefonWrapper({ kontaktinformasjonReducer }: MobiltelefonWrapperProps) {
    return (
        <VisittkortElement beskrivelse="Telefon" ikon={<PhoneIkon />}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <MobiltelefonVisning
                    kontaktinformasjon={(kontaktinformasjonReducer as Loaded<KRRKontaktinformasjon>).data}
                />
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default MobiltelefonWrapper;
