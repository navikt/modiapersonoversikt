import type { Faker } from '@faker-js/faker';
import type NavFaker from 'nav-faker/dist/navfaker';
import {
    type Dokument,
    DokumentDokumentStatus,
    type Dokumentmetadata,
    DokumentmetadataAvsender,
    DokumentmetadataMottaker,
    DokumentmetadataRetning,
    FeilFeilmelding
} from 'src/generated/modiapersonoversikt-api';
import type { FeilWrapper, Journalpost } from 'src/models/saksoversikt/journalpost';
import { fyllRandomListe } from '../utils/mock-utils';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';

export function getJournalposter(faker: Faker, navfaker: NavFaker, tema: string[]): Dokumentmetadata[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(5, 1))
        .fill(null)
        .map(() => getJournalpost(faker, navfaker, tema));
}

function getJournalpost(faker: Faker, navfaker: NavFaker, tema: string[]): Dokumentmetadata {
    const retning = getKommunikasjonsretning(faker);

    return {
        id: faker.string.alphanumeric(8),
        retning: getKommunikasjonsretning(faker),
        dato: getSaksdato(navfaker),
        lestDato: getLestDato(navfaker, retning) ?? undefined,
        navn: navfaker.navn.fornavn(),
        journalpostId: faker.string.alphanumeric(8),
        hoveddokument: getDokument(faker, navfaker),
        vedlegg: navfaker.random.vektetSjanse(0.3) ? fyllRandomListe(() => getDokument(faker, navfaker), 3) : [],
        avsender: getAvsender(faker),
        mottaker: getMottaker(faker),
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
        : { inneholderFeil: false, feilmelding: undefined };
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
        skjerming: navFaker.random.vektetSjanse(0.1) ? 'POL' : undefined,
        dokumentStatus: navFaker.random.vektetSjanse(0.1) ? DokumentDokumentStatus.KASSERT : undefined
    };
}

function getKommunikasjonsretning(faker: Faker): DokumentmetadataRetning {
    return faker.helpers.arrayElement([
        DokumentmetadataRetning.INTERN,
        DokumentmetadataRetning.UT,
        DokumentmetadataRetning.INN
    ]);
}

function getLestDato(navFaker: NavFaker, retning: DokumentmetadataRetning): Journalpost['lestDato'] {
    if (retning !== DokumentmetadataRetning.UT) {
        return null;
    }
    return navFaker.dato.mellom(new Date('2020-06-12'), new Date()).toISOString();
}

function getAvsender(faker: Faker): DokumentmetadataAvsender {
    return faker.helpers.arrayElement([
        DokumentmetadataAvsender.NAV,
        DokumentmetadataAvsender.SLUTTBRUKER,
        DokumentmetadataAvsender.UKJENT,
        DokumentmetadataAvsender.EKSTERN_PART
    ]);
}

function getMottaker(faker: Faker): DokumentmetadataMottaker {
    return faker.helpers.arrayElement([
        DokumentmetadataMottaker.NAV,
        DokumentmetadataMottaker.SLUTTBRUKER,
        DokumentmetadataMottaker.UKJENT,
        DokumentmetadataMottaker.EKSTERN_PART
    ]);
}

function getFeilmelding(faker: Faker): FeilFeilmelding {
    return faker.helpers.arrayElement([
        FeilFeilmelding.TEKNISK_FEIL,
        FeilFeilmelding.SIKKERHETSBEGRENSNING,
        FeilFeilmelding.SAKSBEHANDLER_IKKE_TILGANG,
        FeilFeilmelding.MANGLER_DOKUMENTMETADATA,
        FeilFeilmelding.KORRUPT_PDF,
        FeilFeilmelding.JOURNALFORT_ANNET_TEMA,
        FeilFeilmelding.IKKE_JOURNALFORT,
        FeilFeilmelding.DOKUMENT_SLETTET,
        FeilFeilmelding.DOKUMENT_IKKE_TILGJENGELIG,
        FeilFeilmelding.DOKUMENT_IKKE_FUNNET,
        FeilFeilmelding.TEMAKODE_ER_BIDRAG,
        FeilFeilmelding.UKJENT_FEIL
    ]);
}
