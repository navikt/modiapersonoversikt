import * as React from 'react';
import { ForelderBarnRelasjon, Kjonn } from '../../PersondataDomain';
import ForelderBarnRelasjonVisning from './ForelderBarnRelasjon';
import { capitalizeName } from '../../../../../utils/string-utils';
import { harDiskresjonskode, hentBarnUnder22 } from '../../visittkort-utils';

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
    const barnUnder22 = hentBarnUnder22(relasjoner);

    return (
        <>
            {barnUnder22.map((barn, index) => (
                <ForelderBarnRelasjonVisning
                    key={barn.ident ? barn.ident : index}
                    beskrivelse={capitalizeName(hentKjonnBeskrivelseForBarn(barn))}
                    relasjon={barn}
                    erBarn={true}
                />
            ))}
        </>
    );
}

export default ListeAvBarn;
