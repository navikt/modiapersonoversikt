import * as React from 'react';
import { Kjønn, Sivilstand, SivilstandTyper } from '../../../../../models/person';

interface Props {
    sivilstand: Sivilstand;
    kjønn: Kjønn;
}

function getBeskrivelseForSivilstand(sivilstand: Sivilstand, kjønn: Kjønn) {
    if (sivilstand.value === SivilstandTyper.Enke) {
        return kjønn === Kjønn.Mann ? 'Enkemann' : 'Enke';
    } else {
        return sivilstand.beskrivelse;
    }
}

export function Sivilstand({ sivilstand, kjønn }: Props) {
    const sivilstandBeskrivelse = getBeskrivelseForSivilstand(sivilstand, kjønn);

    return (
        <li title="Sivilstand">
            {sivilstandBeskrivelse}
        </li>
    );
}