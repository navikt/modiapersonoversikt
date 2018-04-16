import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import { Kontaktinformasjon } from '../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../redux/reducer';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { formaterDato } from '../../../../../utils/dateUtils';

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
        const formatertDato = formaterDato(kontaktinformasjon.epost.sistOppdatert);
        return (
            <>
                <Undertekst>{kontaktinformasjon.epost.value}</Undertekst>
                <EtikettLiten>Endret {formatertDato}</EtikettLiten>
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
        <VisittkortElement beskrivelse="Epost Kontakt og reservasjonsregisteret" ikonPath={emailPath}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <Epost kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;