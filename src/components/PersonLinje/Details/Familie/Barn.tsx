import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { capitalizeName } from 'src/utils/string-utils';
import { harDiskresjonskode, hentBarnUnder22 } from '../../utils';
import { ForelderBarnRelasjonVisning } from './components';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

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

    if (kjonn?.kode === 'M') {
        return 'Gutt';
    }
    if (kjonn?.kode === 'K') {
        return 'Jente';
    }
    return 'Ukjent';
}

function Barn({ harFeilendeSystem, relasjoner }: Props) {
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

export default Barn;
