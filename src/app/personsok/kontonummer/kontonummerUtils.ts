export function validerLengdeOgTallPaKontonummer(kontonummer?: string): boolean {
    if (!kontonummer) {
        return false;
    }

    kontonummer = removeWhitespaceAndDot(kontonummer);
    if (inneholderBokstaver(kontonummer)) {
        return false;
    }

    return kontonummer.length === 11;
}

export function removeWhitespaceAndDot(kontonummer: string): string {
    return kontonummer.toString().replace(/[. ]/g, '');
}

export function erGyldigNorskKontonummer(kontonummer?: string): boolean {
    if (!kontonummer) {
        return false;
    }

    kontonummer = removeWhitespaceAndDot(kontonummer);
    return (
        kontonummer !== undefined &&
        parseInt(kontonummer.charAt(kontonummer.length - 1), 10) === mod11FraTallMedKontrollsiffer(kontonummer)
    );
}

function inneholderBokstaver(kontonummer: string): boolean {
    return /[a-zA-Z]/i.test(kontonummer);
}

function mod11FraTallMedKontrollsiffer(kontonummer: string) {
    let controlNumber: number = 2,
        sumForMod: number = 0;

    for (let i = kontonummer.length - 2; i >= 0; --i) {
        sumForMod += parseInt(kontonummer.charAt(i), 10) * controlNumber;
        if (++controlNumber > 7) {
            controlNumber = 2;
        }
    }

    const result = 11 - (sumForMod % 11);
    return result === 11 ? 0 : result;
}
