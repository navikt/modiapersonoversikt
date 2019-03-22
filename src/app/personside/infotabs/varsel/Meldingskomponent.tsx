import * as React from 'react';
import { Varselmelding } from '../../../../models/varsel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    melding: Varselmelding;
}

function Meldingskomponent(props: Props) {
    return <Normaltekst>{props.melding.innhold}</Normaltekst>;
}

export default Meldingskomponent;
