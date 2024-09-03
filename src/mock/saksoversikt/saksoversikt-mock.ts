import { fakerNB_NO as faker } from '@faker-js/faker';

import navfaker from 'nav-faker/dist/index';
import { SakstemaSoknadsstatus, SakstemaSoknadsstatusResponse } from '../../models/saksoversikt/sakstema';
import { Sak } from '../../models/saksoversikt/sak';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';
import { getJournalposter } from './journalpost-mock';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getAremarkSakstemaListeV2 } from './aremark-saksoversikt-mockV2';
import { aremark } from '../persondata/aremark';
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
    navfaker.seed(fødselsnummer + 'utbetaling');

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
    const tema = navfaker.random.arrayElement(temaarray);

    return {
        harTilgang: navfaker.random.vektetSjanse(0.8),
        temakode: tema[0],
        temanavn: tema[1],
        erGruppert: faker.random.boolean(),
        soknadsstatus: getSoknadsstatus(faker, navfaker),
        dokumentMetadata: getJournalposter(faker, navfaker, tema),
        tilhorendeSaker: fyllRandomListe(() => getSak(tema[0]), 15),
        feilkoder: getFeilkoder()
    };
}

function getSak(temakode: string): Sak {
    return {
        temakode: temakode,
        saksid: faker.random.alphaNumeric(8),
        fagsaksnummer: faker.random.alphaNumeric(8),
        avsluttet: getSaksdato(navfaker),
        fagsystem: faker.random.alphaNumeric(5),
        baksystem: getBaksystem(navfaker)
    };
}

function getFeilkoder(): number[] {
    if (vektetSjanse(faker, 0.5)) {
        return [];
    } else {
        return [12345];
    }
}
