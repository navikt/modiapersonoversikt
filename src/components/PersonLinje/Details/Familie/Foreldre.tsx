import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { capitalizeName } from 'src/utils/string-utils';
import { hentForeldre } from '../../utils';
import { ForelderBarnRelasjonVisning } from './components';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

type Props = {
    harFeilendeSystem: boolean;
    forelderBarnRelasjon: ForelderBarnRelasjon[];
};

function Foreldre({ harFeilendeSystem, forelderBarnRelasjon }: Props) {
    const foreldre = hentForeldre(forelderBarnRelasjon);

    return (
        <>
            {foreldre.map((relasjon, index) => (
                <ForelderBarnRelasjonVisning
                    harFeilendeSystem={harFeilendeSystem}
                    key={relasjon.ident ? relasjon.ident : index}
                    beskrivelse={capitalizeName(relasjon.rolle)}
                    relasjon={relasjon}
                    erBarn={false}
                />
            ))}
        </>
    );
}

export default Foreldre;
