import * as React from 'react';

import { utledKjønnFraFødselsnummer } from '../../../../../../utils/fnr-utils';
import { Kjønn } from '../../../../../../models/person/person';
import MannIkon from '../../../../../../svg/Mann';
import KvinneIkon from '../../../../../../svg/Kvinne';
import DiskresjonskodeIkon from '../../../../../../svg/DiskresjonskodeKjonn';
import Guttebarn from '../../../../../../svg/Guttebarn';
import Jentebarn from '../../../../../../svg/Jentebarn';

export function getKjønnIkon(fødselsnummer?: string) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjønn.Mann:
            return <MannIkon />;
        case Kjønn.Kvinne:
            return <KvinneIkon />;
        case Kjønn.Diskresjonskode:
            return <DiskresjonskodeIkon />;
        default:
            return <DiskresjonskodeIkon />;
    }
}

export function getKjønnBarnIkon(fødselsnummer?: string) {
    const kjønn = utledKjønnFraFødselsnummer(fødselsnummer);
    switch (kjønn) {
        case Kjønn.Mann:
            return <Guttebarn />;
        case Kjønn.Kvinne:
            return <Jentebarn />;
        case Kjønn.Diskresjonskode:
            return <DiskresjonskodeIkon />;
        default:
            return <DiskresjonskodeIkon />;
    }
}

export function getKjønnBeskrivelseForBarn(fødselsnummer?: string) {
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
