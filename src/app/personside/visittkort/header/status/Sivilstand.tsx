import * as React from 'react';
import { Kjønn, Sivilstand as SivilstandInterface, SivilstandTyper } from '../../../../../models/person/person';

interface Props {
    sivilstand: SivilstandInterface;
    kjønn: Kjønn;
}

function getBeskrivelseForSivilstand(sivilstand: SivilstandInterface, kjønn: Kjønn) {
    if (sivilstand.kodeRef === SivilstandTyper.Enke) {
        return kjønn === Kjønn.Mann ? 'Enkemann' : 'Enke';
    } else {
        return sivilstand.beskrivelse;
    }
}

export function Sivilstand({ sivilstand, kjønn }: Props) {
    const sivilstandBeskrivelse = getBeskrivelseForSivilstand(sivilstand, kjønn);

    return <li title="Sivilstand">{sivilstandBeskrivelse}</li>;
}
