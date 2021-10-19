import * as React from 'react';
import { ForelderBarnRelasjon } from '../../../PersondataDomain';
import { relasjonErDod } from '../../../visittkort-utils';

interface Props {
    relasjon: ForelderBarnRelasjon;
}

function BostedForRelasjon({ relasjon }: Props) {
    if (relasjonErDod(relasjon)) {
        return null;
    } else if (relasjon.harSammeAdresse) {
        return <>Bor med bruker</>;
    } else {
        return <>Bor ikke med bruker</>;
    }
}

export default BostedForRelasjon;
