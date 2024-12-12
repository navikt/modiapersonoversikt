import type { ForelderBarnRelasjon } from '../../../PersondataDomain';
import { erDod } from '../../../visittkort-utils';

interface Props {
    relasjon: ForelderBarnRelasjon;
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
