import {
    AdresseBeskyttelse,
    ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    KodeBeskrivelse,
    Person,
    PersonStatus,
    Sivilstand,
    SivilstandType
} from './PersondataDomain';

export function erDod(person: Person) {
    const personstatus = person.personstatus.firstOrNull();
    return !person.dodsdato.isEmpty() || (personstatus && personstatus.kode === PersonStatus.DOD);
}

export function hentBarnUnder21(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter(barn => hentAlderOrDefault(barn) <= 21);
}

export function hentBarn(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter(relasjon => relasjon.rolle === ForelderBarnRelasjonRolle.BARN);
}

function hentAlderOrDefault(relasjon: ForelderBarnRelasjon) {
    return relasjon.alder ? relasjon.alder : 0;
}

export function hentForeldre(relasjoner: ForelderBarnRelasjon[]) {
    return relasjoner.filter(
        relasjon =>
            relasjon.rolle === ForelderBarnRelasjonRolle.FAR ||
            relasjon.rolle === ForelderBarnRelasjonRolle.MOR ||
            relasjon.rolle === ForelderBarnRelasjonRolle.MEDMOR
    );
}

export function harDiskresjonskode(adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[]) {
    return adressebeskyttelse.some(
        beskyttelse =>
            beskyttelse.kode === AdresseBeskyttelse.KODE6 ||
            beskyttelse.kode === AdresseBeskyttelse.KODE6_UTLAND ||
            beskyttelse.kode === AdresseBeskyttelse.KODE7
    );
}

export function hentPartner(sivilstand: Sivilstand[]) {
    const aktuelleRelasjoner = [
        SivilstandType.GIFT,
        SivilstandType.REGISTRERT_PARTNER,
        SivilstandType.GJENLEVENDE_PARTNER // TODO: Hva er denne?
    ];
    return sivilstand.find(relasjon => aktuelleRelasjoner.includes(relasjon.type.kode));
}
