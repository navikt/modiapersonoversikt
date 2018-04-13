import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import { Kontaktinformasjon } from '../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../redux/reducer';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';

const emailPath = require('../../../../../resources/svg/email.svg');

interface EpostProps {
    kontaktinformasjon: Kontaktinformasjon;
}

function Epost({kontaktinformasjon }: EpostProps) {
    if (kontaktinformasjon.reservert) {
        return (
            <Undertekst>Reservert</Undertekst>
        );
    } else if (kontaktinformasjon.epost) {
        return (
            <>
                <Undertekst>{kontaktinformasjon.epost.value}</Undertekst>
                <EtikettLiten>Endret {kontaktinformasjon.epost.sistOppdatert}</EtikettLiten>
            </>
        );
    } else {
        return <Undertekst>Ingen epost registrert</Undertekst>;
    }
}

interface EpostWrapperProps {
    kontaktinformasjonReducer: Reducer<Kontaktinformasjon>;
}

function EpostWrapper ({kontaktinformasjonReducer}: EpostWrapperProps) {
    return (
        <VisittkortElement beskrivelse="Epost (KR)" ikonPath={emailPath}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <Epost kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;