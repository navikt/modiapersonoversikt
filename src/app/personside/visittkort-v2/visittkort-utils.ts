import { ENDASH, formaterDato } from 'src/utils/string-utils';
import {
    AdresseBeskyttelse,
    type Dodsdato,
    type ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    type KodeBeskrivelse,
    type LocalDate,
    type Navn,
    type PersonMedAlderOgDodsdato,
    type Sivilstand,
    SivilstandType
} from './PersondataDomain';

export function erDod(dodsdato: Array<LocalDate> | Array<Dodsdato>) {
    return dodsdato.isNotEmpty();
}

export function hentBarnUnder22(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return hentBarn(forelderBarnRelasjon).filter((barn) => hentAlderOrDefault(barn) <= 21);
}

export function hentBarn(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
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

export function harDiskresjonskode(adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[]) {
    return adressebeskyttelse.some(
        (beskyttelse) =>
            beskyttelse.kode === AdresseBeskyttelse.KODE6 ||
            beskyttelse.kode === AdresseBeskyttelse.KODE6_UTLAND ||
            beskyttelse.kode === AdresseBeskyttelse.KODE7
    );
}

export function erPartner(sivilstand: Sivilstand): boolean {
    const aktuelleRelasjoner = [SivilstandType.GIFT, SivilstandType.REGISTRERT_PARTNER];
    return sivilstand?.type && aktuelleRelasjoner.includes(sivilstand?.type.kode);
}

export function hentNavn(navn?: Navn | null, feilmelding = 'Ukjent navn'): string {
    if (!navn) {
        return feilmelding;
    }
    return navn.fornavn + (navn.mellomnavn ? ` ${navn.mellomnavn} ` : ' ') + navn.etternavn;
}

export function hentAlderEllerDod(person: PersonMedAlderOgDodsdato): string | undefined {
    if (erDod(person.dodsdato)) {
        return 'Død';
    }
    return person.alder?.toString();
}

export function hentPeriodeTekst(gyldighetstidspunkt: string | null, opphorstidspunkt?: string | null) {
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
