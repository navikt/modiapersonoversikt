export function splitNavn(navn?: string) {
    const fornavn = navn?.split(' ').slice(0, -1).join(' ');
    const etternavn = navn?.split(' ').slice(-1).join(' ');
    return { fornavn, etternavn };
}

export function fjernAnforselstegn(navn?: string) {
    return navn?.replaceAll('"', '');
}
