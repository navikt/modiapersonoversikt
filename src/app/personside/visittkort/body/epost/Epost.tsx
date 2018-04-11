import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import { Kontaktinformasjon } from '../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../redux/reducer';

const emailPath = require('../../../../../resources/svg/email.svg');

interface EpostProps {
    kontaktinformasjon: Kontaktinformasjon;
}

function Epost({kontaktinformasjon }: EpostProps) {
    if (kontaktinformasjon.epost) {
        return (
            <>
                <Undertekst>{kontaktinformasjon.epost.value}</Undertekst>
                <Undertekst>Endret {kontaktinformasjon.epost.sistOppdatert}</Undertekst>
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
        <VisittkortElement beskrivelse="Epost" ikonPath={emailPath}>
            <Innholdslaster avhengigheter={[kontaktinformasjonReducer]}>
                <Epost kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;