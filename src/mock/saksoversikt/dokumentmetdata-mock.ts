import {
    Dokument,
    DokumentMetadata,
    Entitet,
    Feilmelding,
    FeilWrapper,
    KategoriNotat,
    Kommunikasjonsretning
} from '../../models/saksoversikt/dokumentmetadata';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;
import NavFaker from 'nav-faker/dist/navfaker';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';

export function getDokumentMetadataListe(faker: FakerStatic, navfaker: NavFaker): DokumentMetadata[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(20, 1)).fill(null).map(() => getDokumentMetadata(faker, navfaker));
}

function getDokumentMetadata(faker: FakerStatic, navfaker: NavFaker): DokumentMetadata {
    return {
        retning: getKommunikasjonsretning(faker),
        dato: getSaksdato(navfaker),
        navn: 'Dokument ' + faker.lorem.words(3),
        journalpostId: faker.random.alphaNumeric(8),
        hoveddokument: getDokument(faker),
        vedlegg: fyllRandomListe(() => getDokument(faker), 5),
        avsender: getEntitet(faker),
        mottaker: getEntitet(faker),
        tilhørendeSaksid: faker.random.alphaNumeric(8),
        tilhørendeFagsaksid: faker.random.alphaNumeric(8),
        baksystem: fyllRandomListe(() => getBaksystem(navfaker), 3),
        temakode: faker.random.alphaNumeric(5),
        temakodeVisning: faker.random.alphaNumeric(5),
        ettersending: faker.random.boolean(),
        erJournalfort: faker.random.boolean(),
        feil: getFeilWrapper(faker),
        kategoriNotat: getKategoriNotat(faker)
    };
}

function getFeilWrapper(faker: FakerStatic): FeilWrapper {
    return {
        inneholderFeil: faker.random.boolean(),
        feilmelding: getFeilmelding(faker)
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

function getKommunikasjonsretning(faker: FakerStatic): Kommunikasjonsretning {
    if (vektetSjanse(faker, 0.3)) {
        return Kommunikasjonsretning.Inn;
    } else if (vektetSjanse(faker, 0.3)) {
        return Kommunikasjonsretning.Ut;
    } else {
        return Kommunikasjonsretning.Intern;
    }
}

function getEntitet(faker: FakerStatic): Entitet {
    if (vektetSjanse(faker, 0.2)) {
        return Entitet.EksternPart;
    } else if (vektetSjanse(faker, 0.2)) {
        return Entitet.Nav;
    } else if (vektetSjanse(faker, 0.2)) {
        return Entitet.Sluttbruker;
    } else {
        return Entitet.Ukjent;
    }
}

function getFeilmelding(faker: FakerStatic): Feilmelding {
    if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.DokumentIkkeFunnet;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.DokumentIkkeTilgjengelig;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.DokumentSlettet;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.IkkeJournalfortEllerAnnenBruker;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.JournalfortAnnetTema;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.KorruptPdf;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.ManglerDokumentmetadata;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.SaksbehandlerIkkeTilgang;
    } else if (vektetSjanse(faker, 0.1)) {
        return Feilmelding.Sikkerhetsbegrensning;
    } else {
        return Feilmelding.TekniskFeil;
    }
}

function getKategoriNotat(faker: FakerStatic): KategoriNotat {
    if (vektetSjanse(faker, 0.3)) {
        return KategoriNotat.Forvaltningsnotat;
    } else if (vektetSjanse(faker, 0.3)) {
        return KategoriNotat.InterntNotat;
    } else {
        return KategoriNotat.Referat;
    }
}