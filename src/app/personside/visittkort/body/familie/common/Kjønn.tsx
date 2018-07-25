import * as React from 'react';

import { utledKjønnFraFødselsnummer } from '../../../../../../utils/fnr-utils';
import { Kjønn } from '../../../../../../models/person/person';
import MannIkon from '../../../../../../svg/Mann';
import KvinneIkon from '../../../../../../svg/Kvinne';
import DiskresjonskodeIkon from '../../../../../../svg/DiskresjonskodeKjonn';

export function getKjønnIkon(fødselsnummer: string | null) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjønn.Mann:
            return <MannIkon/>;
        case Kjønn.Kvinne:
            return <KvinneIkon/>;
        case Kjønn.Diskresjonskode:
            return <DiskresjonskodeIkon/>;
        default:
            return <MannIkon/>;
    }
}

export function getKjønnBeskrivelseForBarn(fødselsnummer: string | null) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjønn.Mann:
            return 'Gutt';
        case Kjønn.Kvinne:
            return 'Jente';
        case Kjønn.Diskresjonskode:
            return 'Barn';
        default:
            return 'Ukjent';
    }
}