import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import { Kontaktinformasjon, KontaktinformasjonVerdi } from '../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../redux/reducer';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formatNumber } from '../../../../../utils/helpers';

const phonePath = require('../../../../../resources/svg/phone.svg');

interface MobiltelefonProps {
    mobiltelefon: KontaktinformasjonVerdi;
}

function Mobiltelefon({mobiltelefon}: MobiltelefonProps) {
    const formatertDato = formaterDato(mobiltelefon.sistOppdatert);
    const formatertTelefonnummer = formatNumber('### ## ###', mobiltelefon.value);
    return (
        <>
            <Undertekst>{formatertTelefonnummer}</Undertekst>
            <EtikettLiten>Endret {formatertDato}</EtikettLiten>
        </>
    );
}

interface MobiltelefonVisningProps {
    kontaktinformasjon?: Kontaktinformasjon;
}

function MobiltelefonVisning({kontaktinformasjon }: MobiltelefonVisningProps) {
    if (!kontaktinformasjon) {
        return <>Ingen kontaktinformasjon </>;
    } else if (kontaktinformasjon.reservert) {
        return <Undertekst>Reservert</Undertekst>;
    } else if (kontaktinformasjon.mobiltelefon) {
        return <Mobiltelefon mobiltelefon={kontaktinformasjon.mobiltelefon}/>;
    } else {
        return <Undertekst>Ingen mobiltelefon registrert</Undertekst>;
    }
}

interface MobiltelefonWrapperProps {
    kontaktinformasjonReducer: Reducer<Kontaktinformasjon>;
}

function MobiltelefonWrapper ({kontaktinformasjonReducer}: MobiltelefonWrapperProps) {
    return (
        <VisittkortElement beskrivelse="Telefon (KR)" ikonPath={phonePath}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <MobiltelefonVisning kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default MobiltelefonWrapper;