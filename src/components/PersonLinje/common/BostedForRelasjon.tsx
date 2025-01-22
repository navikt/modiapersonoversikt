import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { erDod } from '../utils';

interface Props {
    relasjon: PersonData['forelderBarnRelasjon'][0];
}

function BostedForRelasjon({ relasjon }: Props) {
    if (erDod(relasjon.dodsdato)) {
        return null;
    }
    if (relasjon.harSammeAdresse) {
        return <>Bor med bruker</>;
    }
    return <>Bor ikke med bruker</>;
}

export default BostedForRelasjon;
