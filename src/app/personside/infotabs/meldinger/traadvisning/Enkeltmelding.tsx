import * as React from 'react';
import { Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';

interface Props {
    melding: Melding;
}

function EnkeltMelding(props: Props) {
    const pilHøyre = true; // TODO: Hvordan settes denne? Høyre for NAV, venstre for bruker
    return (
        <Snakkeboble pilHoyre={pilHøyre} topp={'TEST'}>
            {props.melding.fritekst}
        </Snakkeboble>
    );
}

export default EnkeltMelding;
