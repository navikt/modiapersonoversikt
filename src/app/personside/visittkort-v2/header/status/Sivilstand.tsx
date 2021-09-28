import * as React from 'react';
import { Kjonn, Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';

interface Props {
    sivilstand: SivilstandInterface;
    kjonn: Kjonn;
}

function getBeskrivelseForSivilstand(sivilstand: SivilstandInterface, kjonn: Kjonn) {
    if (sivilstand.type.kode === SivilstandType.ENKE_ELLER_ENKEMANN) {
        return kjonn === Kjonn.M ? 'Enkemann' : 'Enke';
    } else {
        return sivilstand.type.beskrivelse;
    }
}

export function Sivilstand({ sivilstand, kjonn }: Props) {
    const sivilstandBeskrivelse = getBeskrivelseForSivilstand(sivilstand, kjonn);

    return <li title="Sivilstand">{sivilstandBeskrivelse}</li>;
}
