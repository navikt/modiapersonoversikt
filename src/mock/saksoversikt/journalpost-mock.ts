import type { Faker } from '@faker-js/faker';
import type NavFaker from 'nav-faker/dist/navfaker';
import {
    type Dokument,
    DokumentStatus,
    Entitet,
    Feilmelding,
    type FeilWrapper,
    type Journalpost,
    Kommunikasjonsretning
} from '../../models/saksoversikt/journalpost';
import { fyllRandomListe } from '../utils/mock-utils';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';

export function getJournalposter(faker: Faker, navfaker: NavFaker, tema: string[]): Journalpost[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(5, 1))
        .fill(null)
        .map(() => getJournalpost(faker, navfaker, tema));
}

function getJournalpost(faker: Faker, navfaker: NavFaker, tema: string[]): Journalpost {
    const retning = getKommunikasjonsretning(faker);

    return {
        id: faker.string.alphanumeric(8),
        retning: getKommunikasjonsretning(faker),
        dato: getSaksdato(navfaker),
        lestDato: getLestDato(navfaker, retning),
        navn: navfaker.navn.fornavn(),
        journalpostId: faker.string.alphanumeric(8),
        hoveddokument: getDokument(faker, navfaker),
        vedlegg: navfaker.random.vektetSjanse(0.3) ? fyllRandomListe(() => getDokument(faker, navfaker), 3) : [],
        avsender: getEntitet(faker),
        mottaker: getEntitet(faker),
        tilhorendeSaksid: faker.string.alphanumeric(8),
        tilhorendeFagsaksid: faker.string.alphanumeric(8),
        baksystem: fyllRandomListe(() => getBaksystem(faker), 3),
        temakode: tema[0],
        temakodeVisning: tema[1],
        ettersending: faker.datatype.boolean(),
        erJournalfort: faker.datatype.boolean(),
        feil: getFeilWrapper(faker)
    };
}

function getFeilWrapper(faker: Faker): FeilWrapper {
    const erFeil = faker.datatype.boolean(0.1);
    return erFeil
        ? { inneholderFeil: true, feilmelding: getFeilmelding(faker) }
        : { inneholderFeil: false, feilmelding: null };
}

const fakeDokumentNavn = [
    'Referat fra samtale på telefon',
    'Vedtak korrigert refusjon/u bet',
    'Vurdering feilutbetaling/revurdering',
    'A-inntekt',
    'Inntektsopplysninger',
    'Spørsmål via nav.no',
    'Innhenting av opplysninger',
    'Automatisk vedtak/nyfødt barn',
    'Søknad om innvilget en kjempe lang tittel for å kunne få utbetalinger fortest mulig i henhold til mange paragrafer'
];

function getDokument(faker: Faker, navFaker: NavFaker): Dokument {
    return {
        tittel: faker.helpers.arrayElement(fakeDokumentNavn),
        dokumentreferanse: faker.string.alphanumeric(8),
        saksbehandlerHarTilgang: navFaker.random.vektetSjanse(0.9),
        logiskDokument: faker.datatype.boolean(),
        skjerming: navFaker.random.vektetSjanse(0.1) ? 'POL' : null,
        dokumentStatus: navFaker.random.vektetSjanse(0.1) ? DokumentStatus.KASSERT : null
    };
}

function getKommunikasjonsretning(faker: Faker): Kommunikasjonsretning {
    return faker.helpers.arrayElement([
        Kommunikasjonsretning.Intern,
        Kommunikasjonsretning.Ut,
        Kommunikasjonsretning.Inn
    ]);
}

function getLestDato(navFaker: NavFaker, retning: Kommunikasjonsretning): Journalpost['lestDato'] {
    if (retning !== Kommunikasjonsretning.Ut) {
        return null;
    }
    return navFaker.dato.mellom(new Date('2020-06-12'), new Date()).toISOString();
}

function getEntitet(faker: Faker): Entitet {
    return faker.helpers.arrayElement([Entitet.Nav, Entitet.Sluttbruker, Entitet.Ukjent, Entitet.EksternPart]);
}

function getFeilmelding(faker: Faker): Feilmelding {
    return faker.helpers.arrayElement([
        Feilmelding.TekniskFeil,
        Feilmelding.Sikkerhetsbegrensning,
        Feilmelding.SaksbehandlerIkkeTilgang,
        Feilmelding.ManglerDokumentmetadata,
        Feilmelding.KorruptPdf,
        Feilmelding.JournalfortAnnetTema,
        Feilmelding.IkkeJournalfortEllerAnnenBruker,
        Feilmelding.DokumentSlettet,
        Feilmelding.DokumentIkkeTilgjengelig,
        Feilmelding.DokumentIkkeFunnet,
        Feilmelding.TemakodeErBidrag,
        Feilmelding.UkjentFeil
    ]);
}
