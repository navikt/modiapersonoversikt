import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from './VisittkortElement';
import { Kontaktinformasjon } from '../../../../models/person';

const emailPath = require('../../../../resources/svg/email.svg');

function Epost () {
    const mockKontaktinformasjon: Kontaktinformasjon = {
        epost: {
            value: 'test@testesen.com',
            sistOppdatert: '27.12.12'
        }
    };
    const kontaktinformasjon = mockKontaktinformasjon;

    if (kontaktinformasjon.epost) {
        return (
            <VisittkortElement beskrivelse="Epost" ikonPath={emailPath}>
                <Undertekst>{kontaktinformasjon.epost.value}</Undertekst>
                <Undertekst>Endret {kontaktinformasjon.epost.sistOppdatert}</Undertekst>
            </VisittkortElement>
        );
    } else {
        return <Undertekst>Ingen epost registrert</Undertekst>;
    }
}

export default Epost;