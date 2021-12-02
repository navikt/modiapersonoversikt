import { ENDASH, formaterDato } from '../../../utils/string-utils';
import {
    AdresseBeskyttelse,
    ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    KodeBeskrivelse,
    Navn,
    Person,
    PersonStatus,
    Sivilstand,
    SivilstandType
} from './PersondataDomain';

function erDod(person: Person) {
    const personstatus = person.personstatus.firstOrNull();
    return !person.dodsdato.isEmpty() || (personstatus && personstatus.kode === PersonStatus.DOD);
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

export function hentNavn(navn: Navn | null, feilmelding: string = 'Ukjent navn'): string {
    if (!navn) {
        return feilmelding;
    }
    return navn.fornavn + (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ') + navn.etternavn;
}

export function hentAlderEllerDod(person: Person): string | undefined {
    if (erDod(person)) {
        return 'Død';
    }
    return person.alder?.toString();
}

export function hentAlderEllerDodRelasjon(relasjon: ForelderBarnRelasjon): string | undefined {
    if (relasjonErDod(relasjon)) {
        return 'Død';
    }
    return relasjon.alder?.toString();
}

export function relasjonErDod(relasjon: ForelderBarnRelasjon): boolean {
    const personstatus = relasjon.personstatus.firstOrNull();
    return !!personstatus && personstatus.kode === PersonStatus.DOD;
}

export function hentPeriodeTekst(gyldighetstidspunkt: string | null, opphorstidspunkt?: string | null) {
    const fom = gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : '';
    const tom = opphorstidspunkt ? formaterDato(opphorstidspunkt) : '';

    return `${fom} ${ENDASH} ${tom}`;
}
