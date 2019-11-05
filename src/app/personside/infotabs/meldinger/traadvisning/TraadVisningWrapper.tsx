import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Verktoylinje from './verktoylinje/Verktoylinje';
import TraadVisning from './TraadVisning';
import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { meldingstittel, nyesteMelding } from '../utils/meldingerUtils';
import { formatterDatoTid } from '../../../../../utils/dateUtils';

interface TraadVisningWrapperProps {
    valgtTraad?: Traad;
    sokeord: string;
}

function TraadVisningWrapper(props: TraadVisningWrapperProps) {
    if (!props.valgtTraad) {
        return <AlertStripeInfo>Ingen melding valgt</AlertStripeInfo>;
    }
    const sisteMelding = nyesteMelding(props.valgtTraad);
    return (
        <article key={props.valgtTraad.traadId} role="tabpanel">
            <h2 className="sr-only">Valgt melding</h2>
            <h3 className="sr-only" aria-live="assertive">
                Viser {meldingstittel(sisteMelding)} {formatterDatoTid(sisteMelding.opprettetDato)}
            </h3>
            <Verktoylinje valgtTraad={props.valgtTraad} />
            <TraadVisning sokeord={props.sokeord} valgtTraad={props.valgtTraad} />
        </article>
    );
}

export default TraadVisningWrapper;
