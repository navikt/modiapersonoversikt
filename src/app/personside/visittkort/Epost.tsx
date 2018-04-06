import * as React from 'react';

import { Kontaktinformasjon } from '../../../models/person';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

interface EpostProps {
    kontaktinformasjon: Kontaktinformasjon;
}

function Epost ( {kontaktinformasjon}: EpostProps) {
    if (kontaktinformasjon.epost) {
        return (
            <div>
                <Undertekst>{kontaktinformasjon.epost.value}</Undertekst>
                <Undertekst>Endret {kontaktinformasjon.epost.endret}</Undertekst>
            </div>
        );
    } else {
        return <Undertekst>Ingen epost registrert</Undertekst>;
    }
}

export default Epost;