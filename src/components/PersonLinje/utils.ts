import {
    type AdresseBeskyttelse,
    AdresseBeskyttelseKode,
    ForelderBarnRelasjonRolle,
    type Navn,
    type PersonData,
    type PersonDataFeilendeSystemer,
    type RelasjonPerson,
    SivilstandType
} from 'src/lib/types/modiapersonoversikt-api';
import { ENDASH, formaterDato } from 'src/utils/string-utils';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];
type Sivilstand = PersonData['sivilstand'][0];

export function erDod(dodsdato: Array<string>) {
    return dodsdato.isNotEmpty();
}

export function hentBarnUnder22(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return hentBarn(forelderBarnRelasjon).filter((barn) => hentAlderOrDefault(barn) <= 21);
}

function hentBarn(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter((relasjon) => relasjon.rolle === ForelderBarnRelasjonRolle.BARN);
}

function hentAlderOrDefault(relasjon: ForelderBarnRelasjon) {
    return relasjon.alder ? relasjon.alder : 0;
}

export function hentForeldre(relasjoner: ForelderBarnRelasjon[]) {
    return relasjoner.filter(
        (relasjon) =>
            relasjon.rolle === ForelderBarnRelasjonRolle.FAR ||
            relasjon.rolle === ForelderBarnRelasjonRolle.MOR ||
            relasjon.rolle === ForelderBarnRelasjonRolle.MEDMOR
    );
}

export function harDiskresjonskode(adressebeskyttelse: AdresseBeskyttelse[]) {
    return adressebeskyttelse.some(
        (beskyttelse) =>
            beskyttelse.kode === AdresseBeskyttelseKode.KODE6 ||
            beskyttelse.kode === AdresseBeskyttelseKode.KODE6_UTLAND ||
            beskyttelse.kode === AdresseBeskyttelseKode.KODE7
    );
}

export function erPartner(sivilstand: Sivilstand): boolean {
    const aktuelleRelasjoner = [SivilstandType.GIFT.valueOf(), SivilstandType.REGISTRERT_PARTNER.valueOf()];
    return sivilstand?.type && aktuelleRelasjoner.includes(sivilstand?.type.kode);
}

export function hentNavn(navn?: Navn, feilmelding = 'Ukjent navn'): string {
    if (!navn) {
        return feilmelding;
    }
    return navn.fornavn + (navn.mellomnavn ? ` ${navn.mellomnavn} ` : ' ') + navn.etternavn;
}

export function hentAlderEllerDod(person: RelasjonPerson): string | undefined {
    if (erDod(person.dodsdato)) {
        return 'Død';
    }
    return person.alder?.toString();
}

export function hentPeriodeTekst(gyldighetstidspunkt?: string | null, opphorstidspunkt?: string | null) {
    const fom = gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : '';
    const tom = opphorstidspunkt ? formaterDato(opphorstidspunkt) : '';

    return `${fom} ${ENDASH} ${tom}`;
}

const ugyldig_gt_map = {
    '0301': 'Oslo',
    '4601': 'Bergen',
    '5001': 'Trondheim',
    '1103': 'Stavanger'
};
export function mapUgyldigGT(gt: string): string {
    return ugyldig_gt_map[gt as keyof typeof ugyldig_gt_map] ?? 'Ukjent';
}

export function harFeilendeSystemer(
    feilendeSystemer: PersonDataFeilendeSystemer[],
    system: PersonDataFeilendeSystemer
): boolean {
    return feilendeSystemer.includes(system);
}
