import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker/dist/index';
import { Sakstema, SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { Sak } from '../../models/saksoversikt/sak';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';
import { getBehandlingskjede, getBehandlingskjeder } from './behandlingskjeder-mock';
import { getDokumentMetadata, getDokumentMetadataListe } from './dokumentmetdata-mock';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';

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
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetaling');

    return {
        resultat: getSakstemaListe()
    };
}

export function getMockSaksoversiktForTest(fødselsnummer: string): SakstemaResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetaling');

    const tema = navfaker.random.arrayElement(temaarray);
    return {
        resultat: [
            {
                ...getSakstema(),
                behandlingskjeder: [getBehandlingskjede(faker, navfaker)],
                dokumentMetadata: [getDokumentMetadata(faker, navfaker, tema)],
                tilhorendeSaker: [getSak(tema[0])]
            }, {
                ...getSakstema(),
                behandlingskjeder: [getBehandlingskjede(faker, navfaker)],
                dokumentMetadata: [getDokumentMetadata(faker, navfaker, tema)],
                tilhorendeSaker: [getSak(tema[0])]
            }
        ]
    };
}

function getSakstemaListe(): Sakstema[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(15, 1)).fill(null).map(() => getSakstema());
}

function getSakstema(): Sakstema {
    const tema = navfaker.random.arrayElement(temaarray);

    return {
        harTilgang: faker.random.boolean(),
        temakode: tema[0],
        temanavn: tema[1],
        erGruppert: faker.random.boolean(),
        behandlingskjeder: getBehandlingskjeder(faker, navfaker),
        dokumentMetadata: getDokumentMetadataListe(faker, navfaker, tema),
        tilhorendeSaker: fyllRandomListe(() => getSak(tema[0]), 5),
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