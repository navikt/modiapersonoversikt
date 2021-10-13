import * as React from 'react';
import { ForelderBarnRelasjon } from '../../../PersondataDomain';
import { relasjonErDod } from '../../../utils-visittkort';

interface Props {
    relasjon: ForelderBarnRelasjon;
}

function BostedForRelasjon({ relasjon }: Props) {
    const personErDod = relasjon && relasjonErDod(relasjon);
    if (relasjon.bostedAdresse.isEmpty() || personErDod) {
        return null;
    } else if (relasjon.harSammeAdresse) {
        return <>Bor med bruker</>;
    } else {
        return <>Bor ikke med bruker</>;
    }
}

export default BostedForRelasjon;
