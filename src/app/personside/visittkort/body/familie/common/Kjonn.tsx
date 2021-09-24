import * as React from 'react';

import { utledKjonnFraFodselsnummer } from '../../../../../../utils/fnr-utils';
import { Kjonn } from '../../../../../../models/person/person';
import MannIkon from '../../../../../../svg/Mann';
import KvinneIkon from '../../../../../../svg/Kvinne';
import DiskresjonskodeIkon from '../../../../../../svg/DiskresjonskodeKjonn';
import Guttebarn from '../../../../../../svg/Guttebarn';
import Jentebarn from '../../../../../../svg/Jentebarn';

export function getKjonnIkon(fnr?: string) {
    const kjonn = utledKjonnFraFodselsnummer(fnr);
    switch (kjonn) {
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

export function getKjonnBarnIkon(fnr?: string) {
    const kjonn = utledKjonnFraFodselsnummer(fnr);
    switch (kjonn) {
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

export function getKjonnBeskrivelseForBarn(fnr?: string) {
    const kjonn = utledKjonnFraFodselsnummer(fnr);
    switch (kjonn) {
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
