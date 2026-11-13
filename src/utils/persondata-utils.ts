import { AdresseBeskyttelse, type KodeBeskrivelse } from 'src/models/person/persondata';

export function harDiskresjonskode(adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[]) {
    return adressebeskyttelse.some(
        (beskyttelse) =>
            beskyttelse.kode === AdresseBeskyttelse.KODE6 ||
            beskyttelse.kode === AdresseBeskyttelse.KODE6_UTLAND ||
            beskyttelse.kode === AdresseBeskyttelse.KODE7
    );
}
