import * as React from 'react';
import { Melding } from '../../../../../models/meldinger/meldinger';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    melding: Melding;
}

function EnkeltMelding(props: Props) {
    return <Normaltekst>{props.melding.fritekst}</Normaltekst>;
}

export default EnkeltMelding;
