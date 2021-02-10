import * as React from 'react';

import { utledKjønnFraFødselsnummer } from '../../../../../../utils/fnr-utils';
import { Kjonn } from '../../../../../../models/person/person';
import MannIkon from '../../../../../../svg/Mann';
import KvinneIkon from '../../../../../../svg/Kvinne';
import DiskresjonskodeIkon from '../../../../../../svg/DiskresjonskodeKjonn';
import Guttebarn from '../../../../../../svg/Guttebarn';
import Jentebarn from '../../../../../../svg/Jentebarn';

export function getKjønnIkon(fødselsnummer?: string) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjonn.Mann:
            return <MannIkon />;
        case Kjonn.Kvinne:
            return <KvinneIkon />;
        case Kjonn.Diskresjonskode:
            return <DiskresjonskodeIkon />;
        default:
            return <DiskresjonskodeIkon />;
    }
}

export function getKjønnBarnIkon(fødselsnummer?: string) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjonn.Mann:
            return <Guttebarn />;
        case Kjonn.Kvinne:
            return <Jentebarn />;
        case Kjonn.Diskresjonskode:
            return <DiskresjonskodeIkon />;
        default:
            return <DiskresjonskodeIkon />;
    }
}

export function getKjønnBeskrivelseForBarn(fødselsnummer?: string) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjonn.Mann:
            return 'Gutt';
        case Kjonn.Kvinne:
            return 'Jente';
        case Kjonn.Diskresjonskode:
            return 'Barn';
        default:
            return 'Ukjent';
    }
}
