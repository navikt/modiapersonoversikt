export interface DeltBosted {
    startdatoForKontrakt?: string;
    sluttdatoForKontrakt?: string;
    adresse?: DeltBostedAdresse;
    ukjentBosted?: UkjentBosted;
}

interface UkjentBosted {
    bostedskommune?: string;
}

export interface DeltBostedAdresse {
    adressenavn?: string;
    husnummer?: string;
    husbokstav?: string;
    bruksenhetsnummer?: string;
    kommunenummer?: string;
    postnummer?: string;
    bydelsnummer?: string;
    tilleggsnavn?: string;
    coAdressenavn?: string;
}
