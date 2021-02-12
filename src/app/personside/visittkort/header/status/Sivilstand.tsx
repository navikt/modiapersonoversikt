import * as React from 'react';
import { Kjonn, Sivilstand as SivilstandInterface, SivilstandTyper } from '../../../../../models/person/person';

interface Props {
    sivilstand: SivilstandInterface;
    kjønn: Kjonn;
}

function getBeskrivelseForSivilstand(sivilstand: SivilstandInterface, kjønn: Kjonn) {
    if (sivilstand.kodeRef === SivilstandTyper.Enke) {
        return kjønn === Kjonn.Mann ? 'Enkemann' : 'Enke';
    } else {
        return sivilstand.beskrivelse;
    }
}

export function Sivilstand({ sivilstand, kjønn }: Props) {
    const sivilstandBeskrivelse = getBeskrivelseForSivilstand(sivilstand, kjønn);

    return <li title="Sivilstand">{sivilstandBeskrivelse}</li>;
}
