import {
    Dokument,
    Journalpost,
    Entitet,
    Feilmelding,
    FeilWrapper,
    Kommunikasjonsretning
} from '../../models/saksoversikt/journalpost';
import { fyllRandomListe } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { getBaksystem, getSaksdato } from './saksoversikt-felles-mock';

export function getJournalposter(faker: Faker.FakerStatic, navfaker: NavFaker, tema: string[]): Journalpost[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(5, 1))
        .fill(null)
        .map(() => getJournalpost(faker, navfaker, tema));
}

export function getJournalpost(faker: Faker.FakerStatic, navfaker: NavFaker, tema: string[]): Journalpost {
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
        feil: getFeilWrapper(navfaker)
    };
}

function getFeilWrapper(navfaker: NavFaker): FeilWrapper {
    const erFeil = navfaker.random.vektetSjanse(0.1);
    return erFeil
        ? { inneholderFeil: true, feilmelding: getFeilmelding(navfaker) }
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

function getDokument(faker: Faker.FakerStatic, navFaker: NavFaker): Dokument {
    return {
        tittel: navFaker.random.arrayElement(fakeDokumentNavn),
        dokumentreferanse: faker.random.alphaNumeric(8),
        kanVises: navFaker.random.vektetSjanse(0.9),
        logiskDokument: faker.random.boolean(),
        skjerming: navFaker.random.vektetSjanse(0.1) ? 'POL' : null
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
