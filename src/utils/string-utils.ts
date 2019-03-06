export const ENDASH = '\u2013';

export function padLeft(streng: string, width: number, symbol: string) {
    if (streng.length >= width) {
        return streng;
    }
    const leadingSymbol = symbol.length > 0 ? symbol.charAt(0) : ' ';

    return leadingSymbol.repeat(width - streng.length) + streng;
}

export function removeWhitespace(input: string) {
    return input.replace(/ /g, '');
}

export function erTomStreng(input: string) {
    return removeWhitespace(input).length === 0;
}

export function erIkkeTomStreng(input: string) {
    return !erTomStreng(input);
}

export function erTall(input: string) {
    return !isNaN(Number(input));
}

export function sorterAlfabetisk(a: string, b: string) {
    return a > b ? 1 : -1;
}
