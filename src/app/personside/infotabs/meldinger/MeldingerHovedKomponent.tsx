import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface VisningProps {
    traader: Traad[];
}

function MeldingerVisning(props: VisningProps) {
    return <Normaltekst>{props.traader.length}</Normaltekst>;
}

export default MeldingerVisning;
