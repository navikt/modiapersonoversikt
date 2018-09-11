import * as faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker/dist/index';
import { Sakstema, SakstemaWrapper } from '../../models/saksoversikt/sakstema';
import { Sak } from '../../models/saksoversikt/sak';
import { getBaksystem, getOptionalJodaDateTime } from './saksoversikt-felles-mock';
import { getBehandlingskjeder } from './behandlingskjeder-mock';
import { getDokumentMetadataListe } from './dokumentmetdata-mock';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';

export function getMockSaksoversikt(fødselsnummer: string): SakstemaWrapper {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetaling');

    return {
        resultat: getSakstemaListe()
    };
}

function getSakstemaListe(): Sakstema[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(20, 1)).fill(null).map(() => getSakstema());
}

function getSakstema(): Sakstema {
    return {
        harTilgang: faker.random.boolean(),
        temakode: faker.random.alphaNumeric(8),
        temanavn: faker.lorem.words(3),
        erGruppert: faker.random.boolean(),
        behandlingskjeder: getBehandlingskjeder(faker, navfaker),
        dokumentMetadata: getDokumentMetadataListe(faker, navfaker),
        tilhorendeSaker: fyllRandomListe(() => getSak(), 5),
        feilkoder: getFeilkoder()
    };
}

function getSak(): Sak {
    return {
        temakode: faker.random.alphaNumeric(8),
        saksId: faker.random.alphaNumeric(8),
        fagsaksnummer: faker.random.alphaNumeric(8),
        avsluttet: getOptionalJodaDateTime(faker, navfaker),
        fagsystem: faker.random.alphaNumeric(5),
        baksystem: getBaksystem(faker)
    };
}

function getFeilkoder(): number[] {
    if (vektetSjanse(faker, 0.5)) {
        return [];
    } else {
        return [12345];
    }
}