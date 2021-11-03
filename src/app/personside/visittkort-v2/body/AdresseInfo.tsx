import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { Adresse } from '../PersondataDomain';

function Adresseinfo({ adresse }: { adresse: Adresse }) {
    const adresselinje2 = adresse.linje2 ? <Normaltekst>{adresse.linje2}</Normaltekst> : null;
    const adresselinje3 = adresse.linje3 ? <Normaltekst>{adresse.linje3}</Normaltekst> : null;

    return (
        <>
            <Normaltekst>{adresse.linje1}</Normaltekst>
            {adresselinje2}
            {adresselinje3}
        </>
    );
}

export default Adresseinfo;
