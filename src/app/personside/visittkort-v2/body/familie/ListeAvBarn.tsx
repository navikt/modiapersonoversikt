import * as React from 'react';
import { ForelderBarnRelasjon, Kjonn } from '../../PersondataDomain';
import { harDiskresjonskode, hentBarnUnder21 } from '../../person-utils';
import ForelderBarnRelasjonVisning from './ForelderBarnRelasjon';
import { capitalizeName } from '../../../../../utils/string-utils';

interface Props {
    relasjoner: ForelderBarnRelasjon[];
}

function hentKjonnBeskrivelseForBarn(barn: ForelderBarnRelasjon) {
    const adressebeskyttelse = harDiskresjonskode(barn.adressebeskyttelse);
    if (adressebeskyttelse) {
        return 'Barn';
    }
    const kjonn = barn.kjonn.firstOrNull();

    if (kjonn?.kode === Kjonn.M) {
        return 'Gutt';
    } else if (kjonn?.kode === Kjonn.K) {
        return 'Jente';
    } else {
        return 'Ukjent';
    }
}

function ListeAvBarn({ relasjoner }: Props) {
    const barnUnder21 = hentBarnUnder21(relasjoner);

    return (
        <>
            {barnUnder21.map(barn => (
                <ForelderBarnRelasjonVisning
                    key={barn.ident}
                    beskrivelse={capitalizeName(hentKjonnBeskrivelseForBarn(barn))}
                    relasjon={barn}
                    erBarn={true}
                />
            ))}
        </>
    );
}

export default ListeAvBarn;
