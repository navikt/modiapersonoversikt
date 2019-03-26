import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    traad: Traad;
    erValgtTraad: boolean;
    oppdaterValgtTraad: (traad: Traad) => void;
}

function TraadListeElement(props: Props) {
    return <Normaltekst>{props.traad.traadId}</Normaltekst>;
}

export default TraadListeElement;
