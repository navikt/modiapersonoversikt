import {
    Dokument,
    DokumentMetadata,
    Entitet,
    Feilmelding,
    FeilWrapper,
    Kommunikasjonsretning
} from '../../models/saksoversikt/dokumentmetadata';
import { fyllRandomListe } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';

export function getDokumentMetadataListe(
    faker: Faker.FakerStatic,
    navfaker: NavFaker,
    tema: string[]
): DokumentMetadata[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(10, 1))
        .fill(null)
        .map(() => getDokumentMetadata(faker, navfaker, tema));
}

export function getDokumentMetadata(faker: Faker.FakerStatic, navfaker: NavFaker, tema: string[]): DokumentMetadata {
    return {
        id: faker.random.alphaNumeric(8),
        retning: getKommunikasjonsretning(navfaker),
        dato: getSaksdato(navfaker),
        navn: navfaker.navn.fornavn(),
        journalpostId: faker.random.alphaNumeric(8),
        hoveddokument: getDokument(faker, navfaker),
        vedlegg: navfaker.random.vektetSjanse(0.3) ? fyllRandomListe(() => getDokument(faker, navfaker), 3) : [],
        avsender: getEntitet(navfaker),
        mottaker: getEntitet(navfaker),
        tilhørendeSaksid: faker.random.alphaNumeric(8),
        tilhørendeFagsaksid: faker.random.alphaNumeric(8),
        baksystem: fyllRandomListe(() => getBaksystem(navfaker), 3),
        temakode: tema[0],
        temakodeVisning: tema[1],
        ettersending: faker.random.boolean(),
        erJournalfort: faker.random.boolean(),
        feil: getFeilWrapper(faker, navfaker)
    };
}

function getFeilWrapper(faker: Faker.FakerStatic, navfaker: NavFaker): FeilWrapper {
    return {
        inneholderFeil: faker.random.boolean(),
        feilmelding: getFeilmelding(navfaker)
    };
}
const fakeDokumentNavn = [
    'Referat fra samtale på telefon',
    'Vedtak korrigert refusjon/u bet',
    'Vurdering feilutbetaling/revurdering',
    'A-inntekt',
    'Inntektsopplysninger',
    'Spørsmål via nav.no',
    'Innhenting av opplysninger',
    'Automatisk vedtak/nyfødt barn'
];
function getDokument(faker: Faker.FakerStatic, navFaker: NavFaker): Dokument {
    return {
        tittel: navFaker.random.arrayElement(fakeDokumentNavn),
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
    return navfaker.random.arrayElement([Entitet.Nav, Entitet.Sluttbruker, Entitet.Ukjent, Entitet.EksternPart]);
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
