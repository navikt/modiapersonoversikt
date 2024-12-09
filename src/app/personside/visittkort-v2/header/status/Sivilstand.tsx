import { Kjonn, type Person, type Sivilstand as SivilstandInterface, SivilstandType } from '../../PersondataDomain';

interface Props {
    person: Person;
}

function hentBeskrivelseForSivilstand(sivilstand: SivilstandInterface, kjonn: Kjonn | undefined) {
    if (kjonn && sivilstand.type.kode === SivilstandType.ENKE_ELLER_ENKEMANN) {
        return kjonn === Kjonn.M ? 'Enkemann' : 'Enke';
    } else {
        return sivilstand.type.beskrivelse;
    }
}

export function Sivilstand({ person }: Props) {
    const sivilstand = person.sivilstand.firstOrNull();
    const kjonn = person.kjonn.firstOrNull();
    if (!sivilstand) {
        return null;
    }
    const sivilstandBeskrivelse = hentBeskrivelseForSivilstand(sivilstand, kjonn?.kode);

    return <li title="Sivilstand">{sivilstandBeskrivelse}</li>;
}
