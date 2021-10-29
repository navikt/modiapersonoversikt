import * as React from 'react';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { capitalizeName } from '../../../../../utils/string-utils';
import ForelderBarnRelasjonVisning from './ForelderBarnRelasjon';
import { hentForeldre } from '../../visittkort-utils';

interface Props {
    forelderBarnRelasjon: ForelderBarnRelasjon[];
}

function Foreldre({ forelderBarnRelasjon }: Props) {
    const foreldre = hentForeldre(forelderBarnRelasjon);

    return (
        <>
            {foreldre.map((relasjon, index) => (
                <ForelderBarnRelasjonVisning
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
