import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

function Epost () {
    const mockKontaktinformasjon = {
        epost: {
            value: 'test@testesen.com',
            endret: '27.12.12'
        }
    };
    const kontaktinformasjon = mockKontaktinformasjon;

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