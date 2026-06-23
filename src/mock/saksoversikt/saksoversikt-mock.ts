import type { ResultatSaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { getAremarkSaksOgDokumenterListe } from 'src/mock/saksoversikt/aremark-saks-og-dokumenter-mock';
import { aremark } from '../persondata/aremark';

export function getStaticMockSaksoOgDokumenter(fnr: string): ResultatSaksDokumenter {
    if (fnr === aremark.personIdent) {
        return getAremarkSaksOgDokumenterListe();
    }
    return { temaer: [], feilendeSystemer: [], dokumenter: [] };
}
