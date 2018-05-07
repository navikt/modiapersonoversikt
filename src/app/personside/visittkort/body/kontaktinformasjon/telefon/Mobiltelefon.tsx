import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../../VisittkortElement';
import { Kontaktinformasjon, KontaktinformasjonVerdi } from '../../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../../redux/reducer';
import { formaterDato } from '../../../../../../utils/dateUtils';
import EtikettMini from '../../../../../../components/EtikettMini';
import { formaterMobiltelefonnummer } from '../../../../../../utils/telefon-utils';

const phonePath = require('./phone.svg');

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
        <VisittkortElement beskrivelse="Telefon Kontakt- og reservasjonsregisteret" ikonPath={phonePath}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <MobiltelefonVisning kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default MobiltelefonWrapper;
