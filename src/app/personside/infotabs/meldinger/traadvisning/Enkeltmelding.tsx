import * as React from 'react';
import { Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { erMeldingFraNav } from '../utils/meldingerUtils';

interface Props {
    melding: Melding;
}

function EnkeltMelding(props: Props) {
    const pilHøyre = erMeldingFraNav(props.melding.meldingstype);
    return (
        <Snakkeboble pilHoyre={pilHøyre} topp={'TEST'}>
            {props.melding.fritekst}
        </Snakkeboble>
    );
}

export default EnkeltMelding;
