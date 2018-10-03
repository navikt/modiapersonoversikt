import {
    Dokument,
    DokumentMetadata,
    Entitet,
    Feilmelding,
    FeilWrapper,
    KategoriNotat,
    Kommunikasjonsretning
} from '../../models/saksoversikt/dokumentmetadata';
import { fyllRandomListe } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';
import FakerStatic = Faker.FakerStatic;

export function getDokumentMetadataListe(faker: FakerStatic, navfaker: NavFaker): DokumentMetadata[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(20, 1)).fill(null).map(() => getDokumentMetadata(faker, navfaker));
}

function getDokumentMetadata(faker: FakerStatic, navfaker: NavFaker): DokumentMetadata {
    return {
        retning: getKommunikasjonsretning(navfaker),
        dato: getSaksdato(navfaker),
        navn: 'Dokument ' + faker.lorem.words(3),
        journalpostId: faker.random.alphaNumeric(8),
        hoveddokument: getDokument(faker),
        vedlegg: fyllRandomListe(() => getDokument(faker), 5),
        avsender: getEntitet(navfaker),
        mottaker: getEntitet(navfaker),
        tilhørendeSaksid: faker.random.alphaNumeric(8),
        tilhørendeFagsaksid: faker.random.alphaNumeric(8),
        baksystem: fyllRandomListe(() => getBaksystem(navfaker), 3),
        temakode: faker.random.alphaNumeric(5),
        temakodeVisning: faker.random.alphaNumeric(5),
        ettersending: faker.random.boolean(),
        erJournalfort: faker.random.boolean(),
        feil: getFeilWrapper(faker, navfaker),
        kategoriNotat: getKategoriNotat(navfaker)
    };
}

function getFeilWrapper(faker: FakerStatic, navfaker: NavFaker): FeilWrapper {
    return {
        inneholderFeil: faker.random.boolean(),
        feilmelding: getFeilmelding(navfaker)
    };
}

function getDokument(faker: FakerStatic): Dokument {
    return {
        tittel: 'Dokumentnavn: ' + faker.lorem.words(4),
        dokumentreferanse: faker.random.alphaNumeric(8),
        kanVises: faker.random.boolean(),
        logiskDokument: faker.random.boolean()
    };
}

function getKommunikasjonsretning(navfaker: NavFaker): Kommunikasjonsretning {
    return navfaker.random.arrayElement([
        Kommunikasjonsretning.Intern,
        Kommunikasjonsretning.Ut,
        Kommunikasjonsretning.Inn
    ]);
}

function getEntitet(navfaker: NavFaker): Entitet {
    return navfaker.random.arrayElement([
        Entitet.Nav,
        Entitet.Sluttbruker,
        Entitet.Ukjent,
        Entitet.EksternPart
    ]);
}

function getFeilmelding(navfaker: NavFaker): Feilmelding {
    return navfaker.random.arrayElement([
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

function getKategoriNotat(navfaker: NavFaker): KategoriNotat {
    return navfaker.random.arrayElement([
        KategoriNotat.Referat,
        KategoriNotat.InterntNotat,
        KategoriNotat.Forvaltningsnotat
    ]);
}