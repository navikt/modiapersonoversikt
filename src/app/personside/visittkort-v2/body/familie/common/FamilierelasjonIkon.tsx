import * as React from 'react';
// import { utledKjonnFraFodselsnummer } from '../../../../../../utils/fnr-utils';
import Mann from '../../../../../../svg/Mann';
import Kvinne from '../../../../../../svg/Kvinne';
import DiskresjonskodeIkon from '../../../../../../svg/DiskresjonskodeKjonn';
import Guttebarn from '../../../../../../svg/Guttebarn';
import Jentebarn from '../../../../../../svg/Jentebarn';
import { ForelderBarnRelasjon, Kjonn } from '../../../PersondataDomain';
import UkjentKjonn from '../../../../../../svg/UkjentKjonn';
import { harDiskresjonskode } from '../../../person-utils';

interface Props {
    relasjon: ForelderBarnRelasjon;
    erBarn: boolean;
}

export function FamilierelasjonIkon({ relasjon, erBarn }: Props) {
    if (harDiskresjonskode(relasjon.adressebeskyttelse)) {
        return <DiskresjonskodeIkon />;
    }
    const kjonn = relasjon.kjonn.firstOrNull();
    if (kjonn?.kode === Kjonn.M) {
        return erBarn ? <Guttebarn /> : <Mann />;
    } else if (kjonn?.kode === Kjonn.K) {
        return erBarn ? <Jentebarn /> : <Kvinne />;
    } else {
        return <UkjentKjonn />;
    }
}

// export function getKjonnBeskrivelseForBarn(fnr?: string) {
//     const kjonn = utledKjonnFraFodselsnummer(fnr);
//     switch (kjonn) {
//         case Kjonn.Mann:
//             return 'Gutt';
//         case Kjonn.Kvinne:
//             return 'Jente';
//         case Kjonn.Diskresjonskode:
//             return 'Barn';
//         default:
//             return 'Ukjent';
//     }
// }
