import { fakerNB_NO as faker } from '@faker-js/faker';

import navfaker from 'nav-faker/dist/index';
import type { Sak } from '../../models/saksoversikt/sak';
import type { SakstemaSoknadsstatus, SakstemaSoknadsstatusResponse } from '../../models/saksoversikt/sakstema';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getAremarkSakstemaListeV2 } from './aremark-saksoversikt-mockV2';
import { getJournalposter } from './journalpost-mock';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';
import { getSoknadsstatus } from './soknadsstatus-mock';

const temaarray = [
    ['AAP', 'Arbeidsavklaringspenger'],
    ['ENF', 'Enslig forsørger'],
    ['BAR', 'Barnetrygd'],
    ['IND', 'Tiltakspenger'],
    ['OPP', 'Oppfølging'],
    ['TSR', 'Tilleggsstønad arbeidssøkere'],
    ['FEI', 'Filutbetaling'],
    ['DAG', 'Dagpenger'],
    ['FUL', 'Fullmakt'],
    ['GEN', 'Generell'],
    ['PEN', 'Pensjon'],
    ['SYK', 'Sykepenger']
];

export function getMockSaksoversiktV2(fødselsnummer: string): SakstemaSoknadsstatusResponse {
    if (fødselsnummer === aremark.personIdent) {
        return {
            resultat: getAremarkSakstemaListeV2()
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}utbetaling`);

    return {
        resultat: getSakstemaListeV2()
    };
}

export function getStaticMockSaksoversiktV2(): SakstemaSoknadsstatusResponse {
    return {
        resultat: getAremarkSakstemaListeV2()
    };
}

function getSakstemaListeV2(): SakstemaSoknadsstatus[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe(getSakstemaV2, 20, true);
}

function getSakstemaV2(): SakstemaSoknadsstatus {
    const tema = faker.helpers.arrayElement(temaarray);

    return {
        harTilgang: navfaker.random.vektetSjanse(0.8),
        temakode: tema[0],
        temanavn: tema[1],
        erGruppert: faker.datatype.boolean(),
        soknadsstatus: getSoknadsstatus(navfaker),
        dokumentMetadata: getJournalposter(faker, navfaker, tema),
        tilhorendeSaker: fyllRandomListe(() => getSak(tema[0]), 15),
        feilkoder: getFeilkoder()
    };
}

function getSak(temakode: string): Sak {
    return {
        temakode: temakode,
        saksid: faker.string.alphanumeric(8),
        fagsaksnummer: faker.string.alphanumeric(8),
        avsluttet: getSaksdato(navfaker),
        fagsystem: faker.string.alphanumeric(5),
        baksystem: getBaksystem(faker)
    };
}

function getFeilkoder(): number[] {
    if (vektetSjanse(faker, 0.5)) {
        return [];
    }
    return [12345];
}
