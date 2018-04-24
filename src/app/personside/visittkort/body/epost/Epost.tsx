import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import { Kontaktinformasjon, KontaktinformasjonVerdi } from '../../../../../models/kontaktinformasjon';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Reducer } from '../../../../../redux/reducer';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { formaterDato } from '../../../../../utils/dateUtils';

const emailPath = require('./email.svg');

interface EpostProps {
    epost: KontaktinformasjonVerdi;
}

function Epost({epost}: EpostProps) {
    const formatertDato = formaterDato(epost.sistOppdatert);
    return (
        <>
            <Undertekst>{epost.value}</Undertekst>
            <EtikettLiten>Endret {formatertDato}</EtikettLiten>
        </>
    );
}

interface EpostVisningProps {
    kontaktinformasjon: Kontaktinformasjon | undefined;
}

function EpostVisning({kontaktinformasjon }: EpostVisningProps) {
    if (!kontaktinformasjon) {
        return <Undertekst>Ingen kontaktinformasjon registrert</Undertekst>;
    } else if (kontaktinformasjon.reservert) {
        return <Undertekst>Reservert</Undertekst>;
    } else if (kontaktinformasjon.epost) {
        return <Epost epost={kontaktinformasjon.epost}/>;
    } else {
        return <Undertekst>Ingen epost registrert</Undertekst>;
    }
}

interface EpostWrapperProps {
    kontaktinformasjonReducer: Reducer<Kontaktinformasjon>;
}

function EpostWrapper ({kontaktinformasjonReducer}: EpostWrapperProps) {
    return (
        <VisittkortElement beskrivelse="Epost Kontakt- og reservasjonsregisteret" ikonPath={emailPath}>
            <Innholdslaster spinnerSize={'L'} avhengigheter={[kontaktinformasjonReducer]}>
                <EpostVisning kontaktinformasjon={kontaktinformasjonReducer.data}/>
            </Innholdslaster>
        </VisittkortElement>
    );
}

export default EpostWrapper;
