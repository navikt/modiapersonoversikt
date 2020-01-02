import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker/dist/index';
import { Sakstema, SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { Sak } from '../../models/saksoversikt/sak';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';
import { getBehandlingskjeder } from './behandlingskjeder-mock';
import { getJournalposter } from './journalpost-mock';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getAremarkSakstemaListe } from './aremark-saksoversikt-mock';
import { aremark } from '../person/aremark';

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

export function getMockSaksoversikt(fødselsnummer: string): SakstemaResponse {
    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            resultat: getAremarkSakstemaListe()
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetaling');

    return {
        resultat: getSakstemaListe()
    };
}

export function getStaticMockSaksoversikt(): SakstemaResponse {
    return {
        resultat: getAremarkSakstemaListe()
    };
}

function getSakstemaListe(): Sakstema[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe(getSakstema, 20, true);
}

function getSakstema(): Sakstema {
    const tema = navfaker.random.arrayElement(temaarray);

    return {
        harTilgang: navfaker.random.vektetSjanse(0.8),
        temakode: tema[0],
        temanavn: tema[1],
        erGruppert: faker.random.boolean(),
        behandlingskjeder: getBehandlingskjeder(faker, navfaker),
        journalPoster: getJournalposter(faker, navfaker, tema),
        tilhørendeSaker: fyllRandomListe(() => getSak(tema[0]), 15),
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
