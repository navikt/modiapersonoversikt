import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Verktoylinje from './verktoylinje/Verktoylinje';
import TraadVisning from './TraadVisning';
import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
}

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    if (!props.valgtTraad) {
        return <AlertStripeInfo>Ingen melding valgt</AlertStripeInfo>;
    }
    return (
        <>
            <Verktoylinje valgtTraad={props.valgtTraad} />
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} />
        </>
    );
}

export default TraadVisningWrapper;
