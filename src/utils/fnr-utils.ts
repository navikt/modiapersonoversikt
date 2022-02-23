export function erGyldigishFnr(fnr: string) {
    const numeric = !/\D/.test(fnr);
    return fnr.length === 11 && numeric;
}

const kontrollRekke1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const kontrollRekke2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
function kontrollSiffer(ident: number[], kontrollrekke: number[]): number {
    let sum = 0;
    for (let i = 0; i < Math.min(ident.length, kontrollrekke.length); i++) {
        sum += ident[i] * kontrollrekke[i];
    }
    const kontroll = sum % 11;
    return kontroll !== 0 ? 11 - kontroll : 0;
}

function validerIdentModulo(ident: string): boolean {
    const identNummer: number[] = ident.split('').map((it) => parseInt(it));
    const kontroll1 = kontrollSiffer(identNummer, kontrollRekke1);
    const kontroll2 = kontrollSiffer(identNummer, kontrollRekke2);
    return identNummer[9] === kontroll1 && identNummer[10] === kontroll2;
}

export enum FnrValidationError {
    LENGTH,
    NUMBERS_ONLY,
    CONTROL_FAILED
}

export function validerIdent(ident: string): FnrValidationError | undefined {
    if (!ident.match(/^\d+$/)) {
        return FnrValidationError.NUMBERS_ONLY;
    } else if (ident.length !== 11) {
        return FnrValidationError.LENGTH;
    } else if (!validerIdentModulo(ident)) {
        return FnrValidationError.CONTROL_FAILED;
    } else {
        return undefined;
    }
}
