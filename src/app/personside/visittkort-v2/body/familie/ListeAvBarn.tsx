import { capitalizeName } from '../../../../../utils/string-utils';
import { type ForelderBarnRelasjon, Kjonn } from '../../PersondataDomain';
import { harDiskresjonskode, hentBarnUnder22 } from '../../visittkort-utils';
import ForelderBarnRelasjonVisning from './ForelderBarnRelasjon';

interface Props {
    harFeilendeSystem: boolean;
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
    }
    if (kjonn?.kode === Kjonn.K) {
        return 'Jente';
    }
    return 'Ukjent';
}

function ListeAvBarn({ harFeilendeSystem, relasjoner }: Props) {
    const barnUnder22 = hentBarnUnder22(relasjoner);

    return (
        <>
            {barnUnder22.map((barn, index) => (
                <ForelderBarnRelasjonVisning
                    key={barn.ident ? barn.ident : index}
                    harFeilendeSystem={harFeilendeSystem}
                    beskrivelse={capitalizeName(hentKjonnBeskrivelseForBarn(barn))}
                    relasjon={barn}
                    erBarn={true}
                />
            ))}
        </>
    );
}

export default ListeAvBarn;
